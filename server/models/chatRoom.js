const Sequelize = require("sequelize");

class ChatRoom extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        //...
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = ChatRoom;
