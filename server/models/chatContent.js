const Sequelize = require("sequelize");

class ChatContent extends Sequelize.Model {
  static init() {
    super.init({
      //...
    });
  }
}

module.exports = ChatContent;
