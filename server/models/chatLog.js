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
        sequelize,
        modelName: "chat_log",
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    //관계 설정
    db.ChatLog.belongsTo(db.User, {
      foreignKey: {
        name: "user_id",
        unique: false,
        allowNull: false,
      },
      onDelete: "cascade",
    });
    db.ChatLog.belongsTo(db.ChatRoom, {
      foreignKey: {
        name: "room_id",
        unique: false,
        allowNull: false,
      },
      onDelete: "cascade",
    });
  }
}

module.exports = ChatLog;
