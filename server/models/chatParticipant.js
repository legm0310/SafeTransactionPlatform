const Sequelize = require("sequelize");

class ChatParticipant extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        role: {
          type: Sequelize.ENUM("SELLER", "BUYER"),
          allowNull: false,
        },
        selfGranted: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: true,
          comment:
            "채팅방 나갔는지 판단 (null or 0: 둘 다 접근 가능, 유저id: 해당 유저만 접근 가능 )",
          defaultValue: 0,
        },
      },
      {
        sequelize,
        modelName: "chat_participant",
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {}
}

module.exports = ChatParticipant;
