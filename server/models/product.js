const Sequelize = require("sequelize");
require("dotenv").config();

class Product extends Sequelize.Model {
  static init() {
    super.init({
      //...
    });
  }
}

module.exports = Product;
