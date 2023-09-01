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
        room_name: {
          allowNull: false,
          type: Sequelize.STRING,
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
    db.ChatRoom.hasMany(db.ChatLog, {
      foreignKey: {
        name: "room_id",
        unique: false,
        allowNull: false,
      },
      sourceKey: "id",
    });
    db.ChatRoom.belongsTo(db.User, {
      foreignKey: { name: "id" },
      onDelete: "cascade",
    });
  }
}

module.exports = ChatRoom;
