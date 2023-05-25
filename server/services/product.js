const { Container } = require("typedi");
const { BadRequestError, NotFoundError } = require("../utils");

class ProductService {
  constructor() {
    this.Product = Container.get("productModel");
  }
  async addProduct(productBody) {
    const product = await this.Product.create(productBody);
  }
  async purchaseProduct() {}

  async getProductById(id) {
    const product = await this.Product.findByPk(id);
    if (!product) throw new NotFoundError("Product not found");
    return product;
  }

  async getProductByState(State) {
    const product = await this.Product.findAll(id);
    if (!product) throw new NotFoundError("Product not found");
    return product;
  }

  async updateProduct() {}

  async deleteProduct() {
    const deletedRows = await User.destroy({
      where: {},
    });
    if (!deletedRows) {
      throw new Error("User not found");
    }
    return deletedRows;
  }
}

module.exports = ProductService;
