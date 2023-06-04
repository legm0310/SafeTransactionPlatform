const { Container } = require("typedi");
const { BadRequestError, NotFoundError } = require("../utils");

class ProductService {
  constructor() {
    this.Product = Container.get("productModel");
  }
  async addProduct(productBody) {
    const product = await this.Product.create(productBody);
    return product;
  }

  async getProducts() {
    const products = await this.Product.findAll({
      where: "",
      limit: 12,
      order: [["created_at", "DESC"]],
      include: [
        {
          model: ProductImage,
          attributes: ["image_url"],
        },
      ],
    });
  }

  async getRecentProducts() {
    const products = await this.Product.findAll({
      offset: offset,
      limit: 10,
    });
  }

  async getProductsByState(State) {
    const products = await this.Product.findAll(State);
    if (!products) throw new NotFoundError("Product not found");
    return products;
  }

  async getProductById(id) {
    const product = await this.Product.findByPk(id);
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
