const jwt = require("jsonwebtoken");
const db = require("../models");
const { Op } = require("sequelize");
const { Container } = require("typedi");
const { isSocketAuth } = require("../middlewares");

module.exports = (io) => {
  const users = new Map();
  const chatServiceIns = Container.get("chatService");
  // io.use(isSocketAuth);
  io.on("connection", (socket) => {
    const userId = +socket.handshake?.query?.userId;
    const userJoinData = {
      sid: socket.id,
      activeState: null,
    };
    if (typeof userId !== "number") return;
    users.set(userId, userJoinData);
    const req = socket.request;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log(
      `✨Socket connected✨: ${ip}`,
      socket.rooms,
      "Current User Count : ",
      io.engine.clientsCount
    );

    socket.on("disconnect", () => {
      clearSocketAndUserMap();
      const userId = getKeybySid(socket.id);
      users.delete(userId);
      console.log("disconnected", socket.id, userId);
      setTimeout(() => {
        console.log(users);
        console.log(io.engine.clientsCount);
      }, 1000);
    });

    socket.on("connect_error", (error) => {
      console.log("Connection error:", error);
    });

    socket.on("error", (error) => {
      throw error;
    });

    socket.on("onJoinRoom", (roomId) => {
      socket.join(roomId);
      console.log(socket.rooms);
    });

    socket.on("getActiveRoom", (userId, callback) => {
      const user = users.get(+userId);
      callback(user.active);
    });

    socket.on("activeRoom", (userId, roomId) => {
      const userMap = users.get(+userId);
      userMap.activeState = +roomId;
      users.set(+userId, userMap);
    });
    socket.on("DeactiveRoom", (userId) => {
      const userMap = users.get(+userId);
      userMap.activeState = null;
      users.set(+userId, userMap);
    });

    socket.on(
      "onAddRoomAndSend",
      async ({ seller, buyer, roomName, chat }, callback) => {
        try {
          const { room, result } = await chatServiceIns.createRoom({
            userId: buyer.id,
            sellerId: seller.id,
            roomName,
          });

          await db.ChatLog.create({
            content: chat,
            sender_id: buyer.id,
            room_id: room.id,
          });

          if (users.get(+seller.id)) {
            await io
              .to(users.get(+seller.id).sid)
              .emit("onClientJoinRoom", room.id);
            await io.to(users.get(+seller.id).sid).emit("updateSellerRoom", {
              buyer: { id: buyer.id, name: buyer.name },
              chat: chat,
              roomId: room.id,
              selfGranted: 1,
            });
          }

          callback({ result: result, roomId: room.id });
        } catch (err) {
          callback({ result: "error", error: err.message });
        }
      }
    );

    socket.on("onSend", async ({ user, receiver, roomId, chat }) => {
      // console.log(user, roomId, chat);
      const receiverMap = users.get(+receiver.id);
      const allOnline = receiverMap && receiverMap.activeState === +roomId;
      console.log(allOnline, receiverMap);

      const joinUserCount = await chatServiceIns.findAllJoinState(1, +roomId);
      if (joinUserCount.length < 2) {
        await chatServiceIns.updateJoinState(null, 1, +receiver.id, +roomId);
        if (users.get(+receiver.id)) {
          await io
            .to(users.get(+receiver.id).sid)
            .emit("onClientJoinRoom", +roomId);
          await io.to(users.get(+receiver.id).sid).emit("updateSellerRoom", {
            buyer: { id: user.id, name: user.name },
            chat: chat,
            roomId: roomId,
            selfGranted: 1,
          });
        }
      }
      await db.ChatLog.create({
        check_read: allOnline ? 1 : 0,
        content: chat,
        sender_id: user.id,
        room_id: roomId,
      });
      socket.broadcast.to(+roomId).emit("onReceiveSend", {
        user: user,
        chat: chat,
        roomId: roomId,
        allOnline: allOnline,
      });
    });

    socket.on("onRead", async ({ userId, roomId }, callback) => {
      const res = await db.ChatLog.update(
        { check_read: 1 },
        {
          where: {
            sender_id: { [Op.not]: +userId },
            room_id: roomId,
            check_read: 0,
          },
        }
      );
      await callback();
    });

    socket.on("onLeftRoom", async ({ userId, roomId }, callback) => {
      const chatServiceInstance = await Container.get("chatService");
      const result = await chatServiceInstance.deleteRoom({ userId, roomId });
      callback(result);
    });

    function getKeybySid(sid) {
      for (let [key, value] of users.entries()) {
        if (value.sid === sid) return key;
      }
    }

    function clearSocketAndUserMap() {
      for (let [key, value] of users.entries()) {
        if (typeof key !== "number" || isNaN(key)) {
          users.delete(key);
          const socket = io.sockets.sockets.get(socketData.sid);
          if (socket) {
            socket.disconnect();
          }
        }
      }
    }
  });
};
