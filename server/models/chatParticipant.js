const Sequelize = require("sequelize");

class ChatParticipant extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        ChatParticipantId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        receiveUserId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          comment: "메세지 수신자",
        },
        sendUserId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          comment: "메세지 송신자",
        },
        chatType: {
          allowNull: false,
          type: Sequelize.STRING,
          comment: "텍스트, 이미지 구분",
        },
        chatText: {
          allowNull: false,
          type: Sequelize.STRING,
          comment: "메세지 내용",
        },
        checkChat: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          comment: "메세지 읽음 유무 (1 없애기)",
        },
      },
      {
        modelName: "chatParticipant", // This is the name of the table in the database
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        sequelize,
      }
    );
  }
  static associate(db) {
    ChatParticipant.belongsTo(db.ChatRoom, {
      foreignKey: "chatRoomId",
      onDelete: "cascade",
    });
  }
}

module.exports = ChatParticipant;
