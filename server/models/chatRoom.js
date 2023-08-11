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
          allowNull: true,
          type: Sequelize.INTEGER,
        },
        buyer_id: {
          allowNull: true,
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
  //관계 설정
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
      as: "Seller",
      foreignKey: { name: "seller_id" },
      targetKey: "id",
      onDelete: "cascade",
    });
    db.ChatRoom.belongsTo(db.User, {
      as: "Buyer",
      foreignKey: { name: "buyer_id" },
      targetKey: "id",
      onDelete: "cascade",
    });
  }
}

module.exports = ChatRoom;
