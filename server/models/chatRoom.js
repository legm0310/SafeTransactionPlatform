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
        user_id1: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        user_id2: {
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
    ChatRoom.hasMany(db.ChatLog, { foreignKey: "chatroom_id" });
    ChatRoom.belongsTo(db.User, {
      foreignKey: "userId",
      onDelete: "cascade",
    });
  }
}

module.exports = ChatRoom;
