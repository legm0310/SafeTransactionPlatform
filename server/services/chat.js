const { Container } = require("typedi");
const { Op } = require("sequelize");

class ChatService {
  constructor() {
    this.User = Container.get("userModel");
    this.ChatParticipant = Container.get("chatParticipantModel");
    this.ChatRoom = Container.get("chatRoomModel");
    this.ChatLog = Container.get("chatLogModel");
  }

  async createTestRoom(roomData) {
    const user = await this.User.findByPk(1);

    //user가 속한 모든 Room을 가져옴.
    //그중 model과 RoomUser라는 별칭을 사용해서 해당 별칭으로 M:N관계 설정을 했었던 테이블을
    //가져와서 그 중 id값이 2번인 사용자의 id와 user_name을 가져옴.
    //그리고 바깥쪽의 attributes는 가져온 Room 중 id가 2번인 유저가 속한 Room의 id만 가져옴

    // 정리 --> user가 속한 모든 Room중에서 id가 2번인 유저의 id, user_name, 그리고 그가 속한 채팅방 Id를 가져옴
    const isRoomExists = await user.getUserRoom({
      attributes: ["id"],
      include: [
        {
          model: this.User,
          as: "RoomUser",
          where: {
            id: {
              [Op.eq]: 2,
            },
          },
          attributes: ["id", "user_name"],
        },
      ],
    });

    // const room = await this.ChatRoom.create(roomData);
    console.log(isRoomExists[0]);
    return;
  }

  async createRoom(roomData) {
    const user = await this.User.findByPk();
    const room = await this.ChatRoom.create(roomData);
    return room;
  }

  async getRoomById(id) {
    const room = await this.ChatRoom.findByPk(id);
    const roomData = room.toJSON();
    return roomData;
  }

  async getAllRoomByUser(id) {
    const user = await this.User.findByPk(id);
    const [sellingRooms, buyingRooms] = await Promise.allSettled([
      user.getSellingRooms(),
      user.getBuyingRooms(),
    ]);

    const allRooms = sellingRooms.concat(buyingRooms);
    console.log(allRooms);

    return allRooms;
  }

  async deleteRoom(id) {
    const io = this.socketService.getIo();
  }

  async sendMessage() {
    const io = this.socketService.getIo();
  }

  async getMessageByRoom() {
    const io = this.socketService.getIo();
  }
}

module.exports = ChatService;
