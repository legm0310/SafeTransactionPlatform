const { Container } = require("typedi");
const { Op } = require("sequelize");
const { InternalServerError, NotFoundError } = require("../utils");

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
      raw: true,
    });

    // const room = await this.ChatRoom.create(roomData);
    console.log(isRoomExists);
    // if (isRoomExists.length >= 1) {
    //   await this.ChatParticipant.update(
    //     {
    //       self_granted: 0,
    //     },
    //     {
    //       where: {
    //         room_id: isRoomExists[0].id,
    //       },
    //     }
    //   );
    // } else {
    // }
    return;
  }

  async createRoom(roomData) {
    const user = await this.User.findByPk(roomData.userId);

    const isRoomExists = await user.getUserRoom({
      attributes: ["id"],
      include: [
        {
          model: this.User,
          as: "RoomUser",
          where: {
            id: {
              [Op.eq]: roomData.sellerId,
            },
          },
          attributes: ["id", "user_name"],
        },
      ],
      raw: true,
    });

    if (isRoomExists.length >= 1) {
      await this.ChatParticipant.update(
        {
          self_granted: 0,
        },
        {
          where: {
            room_id: isRoomExists[0].id,
          },
        }
      );
    } else {
      const createdRoom = this.ChatRoom.create({
        name: roomData.roomName,
      });
      const addSellerJoin = createdRoom.addChatParticipant({
        role: "SELLER",
        user: roomData.sellerId,
      });
      const addBuyerJoin = createdRoom.addChatParticipant({
        role: "BUYER",
        user: roomData.userId,
      });
    }
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
    //updatedAt 이후의 메시지만 로딩
    // const io = this.socketService.getIo();

    // const user = await this.User.findByPk(roomData.userId);
    const user = await this.User.findByPk(1);
    const targetRoom = await this.ChatRoom.findByPk(1);
    // const targetRoom = await this.ChatRoom.findByPk(roomData.roomId);

    if (!targetRoom) {
      throw new NotFoundError("Chatting room not found");
    }

    const room = await user.getUserRoom({
      attributes: ["name"],
      include: [
        {
          model: this.User,
          as: "RoomUser",
          attributes: ["id", "user_name"],
          through: {
            attributes: [],
          },
        },
      ],
      joinTableAttributes: [],
      raw: true,
    });

    console.log(targetRoom);

    // const chats = await targetRoom.getChatLogs();
    console.log(room);
    // console.log(chats);
    return;
  }
}

module.exports = ChatService;
