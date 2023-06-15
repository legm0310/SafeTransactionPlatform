let io;

/**
 * loader/express에서  loader/socket 호출, container에 주입, chatService에서 의존성 주입
 */
module.exports = {
  init: (server) => {
    io = require("socket.io")(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    return io;
  },
  getIo: () => {
    if (!io) throw new Error("Socket.io is not connected!");
    return io;
  },
};
