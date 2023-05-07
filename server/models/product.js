const Sequelize = require("sequelize");

//db productTable model
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
