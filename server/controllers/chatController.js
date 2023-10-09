const { Container } = require("typedi");
const { catchAsync } = require("../utils");

module.exports = {
  addRoom: catchAsync(async (req, res) => {
    const chatServiceInstance = await Container.get("chatService");
    const roomData = req.body;
    const { room, result } = await chatServiceInstance.createRoom(roomData);
    res.status(201).json({
      addRoomSuccess: true,
      result: result,
      room: room,
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
    res.status(200).json({
      deleteRoomSuccess: result,
      deletedRoom: req.params.id,
    });
  }),
};
