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
        seller_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        buyer_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        room_number: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
      },
      {
        modelName: "chat_room", // This is the name of the table in the database
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        sequelize,
      }
    );
  }
  static associate(db) {
    ChatRoom.hasMany(db.ChatLog, { foreignKey: "room_id" });
    ChatRoom.belongsTo(db.User, {
      foreignKey: "id",
      onDelete: "cascade",
    });
  }
}

module.exports = ChatRoom;
