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
        //seller_id
        user_id1: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        //buyer_id
        user_id2: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        //room_number
        roomNum: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
      },
      {
        //chat_room
        modelName: "chatRoom", // This is the name of the table in the database
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        sequelize,
      }
    );
  }
  static associate(db) {
    //room_id
    ChatRoom.hasMany(db.ChatLog, { foreignKey: "chatroom_id" });
    ChatRoom.belongsTo(db.User, {
      //user_id, id 어떤 아이디 말하는거임 ?
      foreignKey: "userId",
      onDelete: "cascade",
    });
  }
}

module.exports = ChatRoom;
