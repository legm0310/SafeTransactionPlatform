const Sequelize = require("sequelize");

class ChatRoom extends Sequelize.Model {
  static init() {
    super.init({
      //...
    });
  }
}

module.exports = ChatRoom;
