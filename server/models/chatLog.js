const Sequelize = require("sequelize");

class ChatLog extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        receiver_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          comment: "메세지 수신자",
        },
        sender_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          comment: "메세지 송신자",
        },
        chat_type: {
          allowNull: false,
          type: Sequelize.STRING,
          comment: "텍스트, 이미지 구분",
        },
        message: {
          allowNull: false,
          type: Sequelize.STRING,
          comment: "메세지 내용",
        },
        check_read: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          comment: "메세지 읽음 유무 (1 없애기)",
        },
      },
      {
        modelName: "chat_log",
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        sequelize,
      }
    );
  }
  static associate(db) {
    //관계 설정
    ChatLog.belongsTo(db.ChatRoom, {
      foreignKey: "room_id",
      onDelete: "cascade",
    });
  }
}

module.exports = ChatLog;
