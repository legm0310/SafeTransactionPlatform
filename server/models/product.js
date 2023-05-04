const Sequelize = require("sequelize");

class Product extends Sequelize.Model {
  static init() {
    super.init({
      //...
    });
  }
}

module.exports = Product;
