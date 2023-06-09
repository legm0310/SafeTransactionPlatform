const { Container } = require("typedi");
const {
  InternelServerError,
  generateGetProductsQuery,
  extractProductsList,
} = require("../utils");

class ProductService {
  constructor() {
    this.Product = Container.get("productModel");
  }

  async addProduct(productBody) {
    const product = await this.Product.create(productBody);
    return product;
  }

  //query에 따른 분기
  async getProducts(params) {
    const query = generateGetProductsQuery(params);
    const { count, rows } = await this.Product.findAndCountAll(query);
    const pages = Math.ceil(count / 12);
    console.log("query", query);
    console.log(rows);
    const extractedList = extractProductsList(rows);
    return { pages, prodList: extractedList };
  }

  //infinite scrolling 방식 (lastId)
  async getRecentProducts(params) {
    const query = generateGetProductsQuery(params);
    // console.log("query", query);
    const products = await this.Product.findAll(query);
    if (!products) throw new InternelServerError("Internel Server Error");

    const extractedList = extractProductsList(products);
    return extractedList;
  }

  async getProductById(id) {
    const product = await this.Product.findByPk(id);
    const parsedProduct = product.toJSON();
    parsedProduct.images = parsedProduct.images.split(",");
    return parsedProduct;
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
