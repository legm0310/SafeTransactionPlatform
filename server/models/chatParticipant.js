const Sequelize = require("sequelize");

class ChatParticipant extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        role: {
          type: Sequelize.ENUM("SELLER", "BUYER"),
          allowNull: false,
        },
        self_granted: {
          type: Sequelize.TINYINT,
          allowNull: false,
          comment:
            "채팅방 접근 허가(1 접근 가능, 0 접근 불가(채팅방 나간 상태))",
          defaultValue: 1,
        },
      },
      {
        sequelize,
        modelName: "chat_participant",
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {}
}

module.exports = ChatParticipant;
