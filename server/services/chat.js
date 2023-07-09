const { Container } = require("typedi");

class ChatService {
  constructor() {
    this.ChatLog = Container.get("chatLogModel");
    this.ChatRoom = Container.get("chatRoomModel");
    this.socketService = Container.get("socketService");
  }

  async createRoom(roomData) {
    const room = await this.ChatRoom.create(roomData);
    return room;
  }

  async getRoomById(id) {
    const room = await this.ChatRoom.findByPk(id);
    const roomData = room.toJSON();
    return roomData;
  }

  async getAllRoomByUser(id) {
    // const room = await this.ChatRoom.findByPk(id);
    const room = await this.ChatRoom.findAll();
    const roomData = room.toJSON();
    return roomData;
  }

  async deleteRoom(id) {}

  async sendMessage() {}
  async getMessageByRoom() {}
}

module.exports = ChatService;
