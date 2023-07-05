const { Container } = require("typedi");
const {
  InternalServerError,
  generateGetProductsQuery,
  extractProductsList,
} = require("../utils");

class ProductService {
  constructor() {
    this.Product = Container.get("productModel");
  }

  async addProduct(productData) {
    const product = await this.Product.create(productData);
    return product;
  }

  //query에 따른 분기
  async getProductsAndCount(params) {
    const query = generateGetProductsQuery(params);
    const { count, rows } = await this.Product.findAndCountAll(query);
    const pages = Math.ceil(count / 12);
    console.log("query", query);
    console.log(rows);
    const extractedList = extractProductsList(rows);
    return { pages, prodList: extractedList };
  }

  //infinite scrolling 방식 (lastId)
  async getProducts(params) {
    const query = generateGetProductsQuery(params);
    console.log("query", query);
    const products = await this.Product.findAll(query);
    if (!products) throw new InternalServerError("Internal Server Error");

    const extractedList = extractProductsList(products);
    return extractedList;
  }

  async getProductById(id) {
    const product = await this.Product.findByPk(id);
    const productData = product.toJSON();
    productData.images = productData.images.split(",");
    return productData;
  }

  async updateProductStatus(state, id) {
    const updated = await this.Product.update(
      { status: state },
      { where: { id: id } }
    );
    if (!updated) {
      throw new InternalServerError(updated);
    }
    return updated;
  }

  async updateProduct(attr, id) {
    const updated = await this.Product.update(
      { status: attr },
      { where: { id: id } }
    );
    return updated;
  }

  async deleteProduct(id) {
    const deletedRows = await this.Product.destroy({
      where: {},
    });
    if (!deletedRows) {
      throw new Error("User not found");
    }
    return deletedRows;
  }
}

module.exports = ProductService;
