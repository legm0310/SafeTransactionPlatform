const { Container } = require("typedi");

class ProductService {
  constructor() {
    this.Product = Container.get("productModel");
  }

  async addProduct() {}

  async getProduct() {
    try {
    } catch (err) {
      throw err;
    }
  }

  async updateProduct() {
    try {
    } catch (err) {
      throw err;
    }
  }

  async deleteProduct() {
    try {
      const deletedRows = await User.destroy({
        where: {},
      });
      if (!deletedRows) {
        throw new Error("User not found");
      }
      return deletedRows;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ProductService;
