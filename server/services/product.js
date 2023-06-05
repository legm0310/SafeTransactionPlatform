const { Container } = require("typedi");
const { BadRequestError, NotFoundError, parseProducts } = require("../utils");
const { Op } = require("sequelize");

class ProductService {
  constructor() {
    this.Product = Container.get("productModel");
  }

  async addProduct(productBody) {
    const product = await this.Product.create(productBody);
    return product;
  }

  //query에 따른 분기
  //status, search, page
  async getProducts(params) {
    let limit = 12;
    let query = {
      where: { ...params },
      order: [
        ["created_at", "DESC"],
        ["id", "DESC"],
      ],
      limit: limit,
      attributes: ["title", "price", "images", "created_at"],
    };

    const products = await this.Product.findAll(query);
    const parsedProds = parseProducts(products);
    return parsedProds;
  }

  //infinite scrolling 방식 (lastId)
  async getRecentProducts(lastId) {
    let limit = 12;
    let query = {
      where: lastId ? { id: { [Op.lt]: lastId } } : null,
      order: [
        ["created_at", "DESC"],
        ["id", "DESC"],
      ],
      limit: limit,
      attributes: ["title", "price", "images", "created_at"],
    };

    const products = await this.Product.findAll(query);
    if (!products) throw new NotFoundError("Product not found");

    const parsedProds = parseProducts(products);
    return parsedProds;
  }

  async getProductsByState(status) {
    let query = {
      where: { status: status },
    };
    const products = await this.Product.findAll(status);
    if (!products) throw new NotFoundError("Product not found");
    const parsedProds = parseProducts(products);
    return products;
  }

  async getProductById(id) {
    const product = await this.Product.findByPk(id);
    return product.toJSON();
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
