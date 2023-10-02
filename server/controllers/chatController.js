const { Container } = require("typedi");
const { catchAsync } = require("../utils");

module.exports = {
  // createTest: catchAsync(async (req, res) => {
  //   const chatServiceInstance = await Container.get("chatService");
  //   const roomName = req.body.roomName;
  //   const userId = res.locals.userId;
  //   const rooms = await chatServiceInstance.createTestRoom({
  //     roomName,
  //     userId,
  //   });
  //   res.status(201).json({
  //     getRoomsSuccess: true,
  //     rooms: rooms,
  //   });
  // }),

  addRoom: catchAsync(async (req, res) => {
    const chatServiceInstance = await Container.get("chatService");
    const roomData = req.body;
    const { roomId, result } = await chatServiceInstance.createRoom(roomData);
    res.status(201).json({
      addRoomSuccess: true,
      result: result,
      roomId: roomId,
    });
  }),

  getChats: catchAsync(async (req, res) => {
    const chatServiceInstance = await Container.get("chatService");
    const chatRoomData = {
      userId: res.locals.userId,
      roomId: req.params.id,
      lastId: req.query.lastId,
      limit: req.query.limit,
    };
    const { roomInfo, chats } = await chatServiceInstance.getChatsByRoom(
      chatRoomData
    );
    res.status(200).json({
      getChatsSuccess: true,
      roomInfo,
      chats,
    });
  }),

  getRooms: catchAsync(async (req, res) => {
    const chatServiceInstance = await Container.get("chatService");
    const userId = res.locals.userId;
    const rooms = await chatServiceInstance.getRooms(userId);
    res.status(200).json({
      getRoomsSuccess: true,
      rooms,
    });
  }),

  deleteRoom: catchAsync(async (req, res) => {
    const chatServiceInstance = await Container.get("chatService");
    const roomData = { userId: res.locals.userId, roomId: req.params.id };
    const result = await chatServiceInstance.deleteRoom(roomData);
    res.status(204).json({
      deleteRoomSuccess: true,
      result: result,
    });
  }),
};
