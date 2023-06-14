// socket.io 동작 코드 모음

const io = require("../loaders/socket").getIo();
// const { addUser, removeUser, getUser, getUsersInRoom } = require("../users");
io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    clearInterval(socket.interval);
  });

  socket.on("error", (error) => {
    console.log(error);
  });

  socket.on("login", ({ userId }) => {
    socket.join(userId);
  });

  const roomNumMaker = (x, y) => {
    const arr = [x, y];
    arr.sort((a, b) => a - b);
    let roomNum = arr[0].toString() + arr[1];
    return roomNum;
  };
});
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
