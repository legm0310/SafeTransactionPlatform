module.exports = (io) => {
  const db = require("../models");
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
      setTimeout(() => {
        console.log(io.engine.clientsCount);
      }, 1000);
    });

    socket.on("error", (error) => {
      throw error;
    });
    socket.on("test", (text) => {
      console.log("통신내용:", text);
      console.log("방번호:", socket.rooms);
    });
    socket.on("login", ({ userId }) => socket.join(userId));

    socket.on("onJoinRoom", (roomId) => {
      socket.join(roomId);
      console.log(socket.rooms);
    });

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
      // socket.broadcast
      //   .to(+roomId)
      //   .emit("onUpdateRecentChat", { roomId: roomId, chat: chat });
    });

    socket.on("onRead", async ({ user, roomId, chat }) => {
      await db.ChatLog.update(
        { check_read: true },
        { where: { check_read: false } }
      );
      socket.broadcast.to(roomId).emit("onReceiveRead", { user, chat });
    });
  });
};
