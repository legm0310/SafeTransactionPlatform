const Sequelize = require("sequelize");

class ChatLog extends Sequelize.Model {
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

module.exports = ChatLog;
