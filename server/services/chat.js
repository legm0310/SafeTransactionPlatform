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
    const userId = roomData.userId;
    const sellerId = roomData.sellerId;
    let roomId = null;

    const user = await this.User.findByPk(userId);

    const isRoomExists = await user.getUserRoom({
      attributes: ["id"],
      include: [
        {
          model: this.User,
          as: "RoomUser",
          where: {
            id: {
              [Op.eq]: sellerId,
            },
          },
          attributes: ["id", "user_name"],
        },
      ],
      raw: true,
    });

    if (isRoomExists.length >= 1) {
      roomId = isRoomExists[0].id;

      await this.ChatParticipant.update(
        {
          self_granted: 1,
        },
        {
          where: {
            user_id: userId,
            room_id: roomId,
          },
        }
      );
    } else {
      const createdRoom = await this.ChatRoom.create({
        name: roomData.roomName,
      });
      const addSellerJoin = createdRoom.addChatParticipant({
        role: "SELLER",
        user_id: sellerId,
      });
      const addBuyerJoin = createdRoom.addChatParticipant({
        role: "BUYER",
        user_id: userId,
      });

      await Promise.allSettled([addSellerJoin, addBuyerJoin]);

      roomId = createdRoom.id;
    }

    return roomId;
  }

  async addMessage(messageData) {
    const message = await this.ChatLog.create(messageData);
    return message;
  }

  async deleteRoom(roomData) {
    const userId = roomData.userId;
    const roomId = roomData.roomId;

    const roomUser = await this.ChatParticipant.findAll({
      where: {
        room_id: roomId,
      },
      raw: true,
    });

    const targetRoomUser = roomUser.find(
      (obj) => obj.self_granted === 1 && obj.user_id === userId
    );

    if (!targetRoomUser)
      throw new InternalServerError("User not exists in room");
    else {
      await this.ChatParticipant.update(
        {
          self_granted: 0,
        },
        {
          where: {
            user_id: userId,
            room_id: roomId,
          },
        }
      );
    }

    const joinUserExists = roomUser.filter((obj) => obj.self_granted === 1);
    if (joinUserExists.length <= 1) {
      await this.ChatRoom.destroy({
        where: {
          id: roomId,
        },
      });
    }

    return true;
  }

  async getMessageByRoom() {
    //updatedAt 이후의 메시지만 로딩

    // const user = await this.User.findByPk(roomData.userId);
    // const targetRoom = await this.ChatRoom.findByPk(roomData.roomId);
    const user = await this.User.findByPk(1);
    const targetRoom = await this.ChatRoom.findByPk(1);

    if (!user && !targetRoom) {
      throw new NotFoundError("Chatting room and user not found");
    } else if (!user) {
      throw new NotFoundError("Chat user not found");
    } else if (!targetRoom) {
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

  async sendMessage() {
    const io = this.socketService.getIo();
  }
}

module.exports = ChatService;
