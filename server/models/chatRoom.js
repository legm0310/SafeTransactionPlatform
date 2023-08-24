const Sequelize = require("sequelize");

class ChatRoom extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        room_name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
      },
      {
        sequelize,
        modelName: "chat_room", // This is the name of the table in the database
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  //관계 설정
  static associate(db) {
    db.ChatRoom.hasMany(db.ChatLog, {
      foreignKey: "room_id",
    });

    db.ChatRoom.belongsToMany(db.User, {
      through: "chat_participant",
      as: "ChatParticipant",
      foreignKey: "room_id",
      onDelete: "cascade",
    });
  }
}

module.exports = ChatRoom;
