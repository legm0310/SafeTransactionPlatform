module.exports = (io) => {
  const db = require("../models");
  const { Container } = require("typedi");

  io.on("connection", (socket) => {
    const req = socket.request;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log(
      "✨Socket connected✨",
      ip,
      socket.id,
      req.ip,
      socket.rooms,
      "Current User Count : ",
      io.engine.clientsCount
    );

    socket.on("disconnect", () => {
      console.log("disconnected", socket.id);
      setTimeout(() => {
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

    socket.on("getMyRooms", (callback) => {
      const rooms = Object.keys(socket.rooms);
      console.log(rooms);
      callback(rooms);
    });

    socket.on(
      "onAddRoomAndSend",
      async ({ userId, sellerId, roomName, chat }, callback) => {
        const chatServiceInstance = await Container.get("chatService");
        try {
          const { room, result } = await chatServiceInstance.createRoom({
            userId,
            sellerId,
            roomName,
          });

          await db.ChatLog.create({
            content: chat,
            sender_id: userId,
            room_id: room.id,
          });
          callback({ result: result, roomId: room.id });
        } catch (err) {
          callback({ result: "error", error: err.message });
        }
      }
    );

    socket.on("onSend", async ({ user, roomId, chat }) => {
      console.log(user, roomId, chat);
      await db.ChatLog.create({
        content: chat,
        sender_id: user.id,
        room_id: roomId,
      });
      console.log(socket.rooms, socket.connected, roomId);
      socket.broadcast
        .to(+roomId)
        .emit("onReceiveSend", { user: user, chat: chat, roomId: roomId });
    });

    socket.on("onRead", async ({ user, roomId, chat }) => {
      await db.ChatLog.update(
        { check_read: true },
        { where: { check_read: false } }
      );
      socket.broadcast.to(roomId).emit("onReceiveRead", { user, chat });
    });

    socket.on("onLeftRoom", async ({ userId, roomId }, callback) => {
      const chatServiceInstance = await Container.get("chatService");
      const result = await chatServiceInstance.deleteRoom({ userId, roomId });
      callback(result);
    });
  });
};
