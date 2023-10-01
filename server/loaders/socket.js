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
      "Current User Count : ",
      io.engine.clientsCount
    );

    socket.on("disconnect", () => {
      console.log("After Disconnected User Count : ", io.engine.clientsCount);
      clearInterval(socket.interval);
    });

    socket.on("error", (error) => {
      console.log(error);
    });

    socket.on("login", ({ userId }) => socket.join(userId));

    socket.on("onJoinRoom", (roomId) => socket.join(roomId));

    socket.on("onSend", async ({ user, roomId, chat }) => {
      await db.ChatLog.create({
        content: chat,
        sender_id: user.id,
        room_id: roomId,
      });

      socket.broadcast.to(roomId).emit("onReceiveSend", { user, chat });
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

// socket.on(EVENT.JOIN_ROOM, async ({ userId, qUserId }) => {
//   try {
//     const roomNum = await roomNumMaker(userId, qUserId);
//     await chatService.createChatRoom({ userId, qUserId, roomNum });
//     socket.join(roomNum);
//     socket.leave(userId);
//   } catch (error) {
//     console.log(error);
//   }
// });

// socket.io 동작
// io.on("connection", (socket) => {
//   const roomNumMaker = (x, y) => {
//     const arr = [x, y];
//     arr.sort((a, b) => a - b);
//     let roomNum = arr[0].toString() + arr[1];
//     return roomNum;
//   };

//   socket.on("join", ({ name, room }, callback) => {
//     const { error, user } = addUser({ id: socket.id, name, room });
//     console.log("유저이름 : " + user?.["id"]);

//     if (error) callback({ error: "에러가 발생했습니다." });

//     socket.emit("message", {
//       user: "admin",
//       text: `${user?.name}, ${user?.room}에 오신 것을 환영합니다.`,
//     });
//     io.to(user.room).emit("roomData", {
//       room: user.room,
//       users: getUsersInRoom(user.room),
//     });
//     socket.join(user.room);
//     callback();
//   });

//   socket.on("sendMessage", (message, callback) => {
//     const user = getUser(socket.id);
//     console.log(`${user.name} : "${message}"`);
//     // console.log(typeof message, message)
//     io.to(user.room).emit("message", {
//       user: user.name,
//       text: message,
//     });
//     callback();
//   });
//   socket.on("disconnect", () => {
//     const user = removeUser(socket.id);
//     if (user) {
//       io.to(user.room).emit("message", {
//         user: "admin",
//         text: `${user.name}님이 퇴장하셨습니다.`,
//       });
//       io.to(user.room).emit("roomData", {
//         room: user.room,
//         users: getUsersInRoom(user.room),
//       });
//     }
//     console.log("유저가 나갔습니다.");
//   });
// });
