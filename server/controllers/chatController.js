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
    const roomId = req.params.id;
    const room = await chatServiceInstance.getChatsByRoom(roomId);
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
      rooms,
    });
  }),

  deleteRoom: catchAsync(async (req, res) => {
    const chatServiceInstance = await Container.get("chatService");
    const roomData = { userId: res.locals.userId, roomId: req.params.id };
    const result = await chatServiceInstance.deleteRoom(roomData);
    res.status(200).json({
      deleteRoomsSuccess: true,
      result: result,
    });
  }),

  getMessagesTest: catchAsync(async (req, res) => {
    const chatServiceInstance = await Container.get("chatService");
    // const userId = res.locals.userId;
    const result = await chatServiceInstance.getMessageByRoom();
    res.status(200).json({
      getMessagesSuccess: true,
      result: result,
    });
  }),

  addMessage: catchAsync(async (req, res) => {
    const chatServiceInstance = await Container.get("chatService");
    const message = await chatServiceInstance.addMessage(req.body);
    res.status(201).json({
      addMessageSuccess: true,
      message: message,
    });
  }),
};
