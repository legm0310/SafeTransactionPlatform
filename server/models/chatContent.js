const Sequelize = require("sequelize");

class ChatContent extends Sequelize.Model {
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

module.exports = ChatContent;
