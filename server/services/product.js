const { Container } = require("typedi");

class ProductService {
  constructor() {
    this.Product = Container.get("productModel");
  }
}

module.exports = ProductService;
