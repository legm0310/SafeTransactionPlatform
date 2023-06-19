const { Container } = require("typedi");

class ChatService {
  constructor() {
    this.ChatLog = Container.get("chatLogModel");
    this.ChatRoom = Container.get("chatRoomModel");
  }

  async addRoom(chatBody) {
    const chat = await this.ChatRoom.create(chatBody);
    return chat;
  }

  // async getChatById(id) {
  //   const chat = await this.Chat.findByPk(id);
  //   const parsedChat = chat.toJSON();
  //   return parsedChat;
  // }
}

module.exports = ChatService;
