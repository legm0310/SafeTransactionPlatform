const Sequelize = require("sequelize");

class Product extends Sequelize.Model {
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

module.exports = Product;
