module.exports = (io) => {
  io.on("connection", (socket) => {
    const req = socket.request;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log("✨Socket connected✨", ip, socket.id, req.ip);
    // console.log("✨Socket connected✨");
    socket.on("disconnect", () => {
      clearInterval(socket.interval);
    });

    socket.on("error", (error) => {
      console.log(error);
    });

    socket.on("login", ({ userId }) => {
      socket.join(userId);
    });
  });
};

// let io;

// /**
//  * loader/express에서  loader/socket 호출, container에 주입, chatService에서 의존성 주입
//  */
// module.exports = {
//   init: (server) => {
//     io = require("socket.io")(server, {
//       cors: {
//         origin: "*",
//         methods: ["GET", "POST"],
//       },
//     });
//     return io;
//   },
//   getIo: () => {
//     if (!io) throw new Error("Socket.io is not connected!");
//     return io;
//   },
// };
