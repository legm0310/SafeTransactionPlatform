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
        type: {
          allowNull: true,
          type: Sequelize.STRING,
          comment: "텍스트, 이미지 구분",
          defaultValue: "text",
        },
        content: {
          allowNull: false,
          type: Sequelize.STRING,
          comment: "채팅 내용",
        },
        check_read: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          comment: "메세지 읽음 유무 (true/1읽음, false/0읽기전)",
          defaultValue: 0,
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
    // 1 : N
    db.ChatLog.belongsTo(db.User, {
      foreignKey: { name: "sender_id", allowNull: false },
      onDelete: "cascade",
    });

    // 1 : N
    db.ChatLog.belongsTo(db.ChatRoom, {
      foreignKey: { name: "room_id", allowNull: false },
      onDelete: "cascade",
    });
  }
}

module.exports = ChatLog;
