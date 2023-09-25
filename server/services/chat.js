const { Container } = require("typedi");
const { where, Op, fn, col, literal } = require("sequelize");
const { sequelize } = require("../models");
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
    return;
  }

  async createRoom(roomData) {
    const userId = +roomData.userId;
    const sellerId = +roomData.sellerId;

    let roomId = null;
    let result = "";

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
    });

    if (isRoomExists.length >= 1) {
      roomId = isRoomExists[0].id;
      result = "Update Room";
      await this.updateJoinState(null, 1, userId, roomId);
    } else {
      const createdRoom = await this.ChatRoom.create({
        name: roomData.roomName,
      });
      const addSellerJoin = createdRoom.addRoomUser(sellerId, {
        through: { role: "SELLER" },
      });
      const addBuyerJoin = createdRoom.addRoomUser(userId, {
        through: { role: "BUYER" },
      });

      await Promise.allSettled([addSellerJoin, addBuyerJoin]);

      roomId = createdRoom.id;
      result = "Create New Room";
    }

    return { roomId, result };
  }

  // async getRooms(userId) {
  //   const user = await this.User.findByPk(+userId);
  //   const roomData = await user.getUserRoom({
  //     include: [
  //       {
  //         model: this.User,
  //         as: "RoomUser",
  //         where: {
  //           [Op.not]: {
  //             id: +userId,
  //           },
  //         },
  //         attributes: ["id", "user_name"],
  //       },
  //       {
  //         model: this.ChatLog,
  //         // where: {
  //         //   [Op.not]: {
  //         //     id: +userId,
  //         //   },
  //         // },
  //         limit: 1,
  //         order: [
  //           ["createdAt", "DESC"],
  //           ["id", "DESC"],
  //         ],
  //         attributes: [
  //           "content",
  //           "createdAt",
  //           [
  //             literal(`(
  //             SELECT COUNT(*)
  //             FROM chat_log as subChatLogs
  //             WHERE subChatLogs.room_id = chat_log.room_id AND subChatLogs.sender_id = chat_log.sender_id AND subChatLogs.check_read = 1
  //           )`),
  //             "unreadCount",
  //           ],
  //         ],
  //       },
  //     ],
  //   });

  //   const filteredRooms = await roomData.filter((room) =>
  //     room.chat_participant.self_granted === 1 ? true : false
  //   );
  //   return filteredRooms;
  // }
  // 2단계 실행 함수 (단일쿼리 + 집계함수사용)
  async getRooms(userId) {
    const user = await this.User.findByPk(+userId);
    const roomData = await user.getUserRoom({
      include: [
        {
          model: this.User,
          as: "RoomUser",
          where: {
            [Op.not]: {
              id: +userId,
            },
          },
          attributes: ["id", "user_name"],
        },
        {
          model: this.ChatLog,
          limit: 1,
          order: [
            ["createdAt", "DESC"],
            ["id", "DESC"],
          ],
          attributes: ["content", "createdAt"],
        },
      ],
    });

    const filterdRooms = [];
    for (const room of roomData) {
      if (room.chat_participant.self_granted === 1) {
        const unreadCount = await this.ChatLog.count({
          where: {
            [Op.not]: { sender_id: +userId },
            room_id: room.id,
            check_read: 1,
          },
        });
        const roomWithUnreadCount = room.get();
        roomWithUnreadCount.unreadCount = unreadCount;

        filterdRooms.push(roomWithUnreadCount);
      }
    }

    return filterdRooms;
  }

  async deleteRoom(roomData) {
    const txn = await sequelize.transaction();

    const userId = +roomData.userId;
    const roomId = +roomData.roomId;

    try {
      const roomUser = await this.findAllJoinState(1, roomId, txn);

      const targetRoomUser = roomUser.find((obj) => obj.user_id === userId);
      if (!targetRoomUser) throw new NotFoundError("User not exists in room");

      await this.updateJoinState(null, 0, userId, roomId, txn);

      const recheckedJoinUser = await this.findAllJoinState(1, roomId, txn);
      if (recheckedJoinUser.length < 1) {
        await this.ChatRoom.destroy({
          where: {
            id: roomId,
          },
          transaction: txn,
        });
      }

      await txn.commit();

      return true;
    } catch (error) {
      await txn.rollback();
      throw error;
    }
  }

  async getChatsByRoom(chatRoomData) {
    //updatedAt 이후의 메시지만 로딩
    const convertData = Object.fromEntries(
      Object.entries(chatRoomData).map(([key, value]) => [key, Number(value)])
    );
    console.log(convertData);
    const { lastId, userId, roomId } = convertData;

    const targetRoomPromise = await this.ChatRoom.findByPk(roomId);
    const userPromise = await this.User.findByPk(userId);
    const lastJoin = await this.ChatParticipant.findOne({
      where: {
        user_id: userId,
        room_id: roomId,
      },
      attributes: ["updatedAt"],
    });

    const [{ value: targetRoom }, { value: user }] = await Promise.allSettled([
      targetRoomPromise,
      userPromise,
    ]);

    if (!targetRoom) throw new NotFoundError("Chatting room not found");

    const roomsPromise = user.getUserRoom({
      where: { id: roomId },
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
    });

    const chatsPromise = targetRoom.getChat_logs({
      where: {
        id: +lastId === -1 ? { [Op.gt]: +lastId } : { [Op.lt]: +lastId },
        createdAt: {
          [Op.gt]: lastJoin.updatedAt,
        },
      },
      limit: 15,
      order: [
        ["createdAt", "DESC"],
        ["id", "DESC"],
      ],
      include: [
        {
          model: this.User,
          attributes: ["id", "user_name"],
        },
      ],
    });

    const [{ value: rooms }, { reason, value: chats }] =
      await Promise.allSettled([roomsPromise, chatsPromise]);

    if (reason) {
      throw new InternalServerError("Database query error at chatServices");
    }

    return {
      roomInfo: {
        roomId: roomId,
        roomName: rooms[0].name,
        users: rooms[0].RoomUser.map((user) => user),
      },
      chats: chats?.reverse(),
    };
  }

  async findAllJoinState(state, roomId, txnObj) {
    const userState = await this.ChatParticipant.findAll({
      where: {
        self_granted: state,
        room_id: roomId,
      },
      raw: true,
      lock: true,
      transaction: txnObj,
    });
    return userState;
  }

  async updateJoinState(role, state, userId, roomId, txnObj) {
    await this.ChatParticipant.update(
      {
        ...(role ? { role: role } : {}),
        self_granted: state,
      },
      {
        where: {
          user_id: userId,
          room_id: roomId,
        },
        ...(txnObj ? { transaction: txnObj } : {}),
      }
    );
    return;
  }
}

module.exports = ChatService;
