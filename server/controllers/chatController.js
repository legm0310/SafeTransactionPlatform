const { Container } = require("typedi");
const { catchAsync } = require("../utils");

module.exports = {
  // getChats: catchAsync(async (req, res) => {
  //   const chatServiceInstance = await Container.get("chatService");
  //   const params = req.query;
  //   const { pages, chatList } = await chatServiceInstance.getChats(params);
  //   res.status(200).json({
  //     getChatsSuccess: true,
  //     totalPage: pages,
  //     chats: chatList,
  //   });
  // }),
  addRoom: catchAsync(async (req, res) => {
    const chatServiceInstance = await Container.get("chatService");
    const chatRoom = await chatServiceInstance.createRoom(req.body);
    res.status(201).json({
      addRoomSuccess: true,
      room: chatRoom,
    });
  }),

  getRoom: catchAsync(async (req, res) => {
    const chatServiceInstance = await Container.get("chatService");
    const roomId = req.params.id;
    const room = await chatServiceInstance.getRoomById(roomId);
    res.status(200).json({
      getRoomSuccess: true,
      room: room,
    });
  }),

  createTest: catchAsync(async (req, res) => {
    const chatServiceInstance = await Container.get("chatService");
    const roomName = req.body.roomName;
    const userId = res.locals.userId;
    const rooms = await chatServiceInstance.createTestRoom({
      roomName,
      userId,
    });
    res.status(200).json({
      getRoomsSuccess: true,
      rooms: rooms,
    });
  }),

  getRooms: catchAsync(async (req, res) => {
    const chatServiceInstance = await Container.get("chatService");
    const userId = res.locals.userId;
    const rooms = await chatServiceInstance.getRooms(userId);
    res.status(200).json({
      getRoomsSuccess: true,
      rooms: rooms,
    });
  }),
};
