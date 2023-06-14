const Sequelize = require("sequelize");

class ChatRoom extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        chatRoomId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        userId2: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        roomNum: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
      },
      {
        modelName: "chatRoom", // This is the name of the table in the database
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        sequelize,
      }
    );
  }
  static associate(db) {
    ChatRoom.hasMany(db.ChatLog, { foreignKey: "chatRoomId" });
    ChatRoom.belongsTo(db.User, {
      foreignKey: "userId",
      onDelete: "cascade",
    });
  }
}

module.exports = ChatRoom;
