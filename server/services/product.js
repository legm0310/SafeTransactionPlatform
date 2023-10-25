const { Container } = require("typedi");
const { Op } = require("sequelize");
const {
  InternalServerError,
  generateGetProductsQuery,
  extractProductsList,
} = require("../utils");

class ProductService {
  constructor() {
    this.Product = Container.get("productModel");
    this.User = Container.get("userModel");
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
    // console.log("query", query);
    // console.log(rows);
    const extractedList = extractProductsList(rows);
    return { pages, prodList: extractedList };
  }

  //infinite scrolling 방식 (lastId)
  async getProducts(params) {
    const query = generateGetProductsQuery(params);
    const products = await this.Product.findAll(query);
    if (!products) throw new InternalServerError("Internal Server Error");

    const extractedList = extractProductsList(products);
    extractedList.count = await this.Product.count({
      where: {
        title: { [Op.like]: `%${params.search}%` },
        category: { [Op.like]: `${params.category}` },
      },
    });
    return extractedList;
  }

  async getProductById(id) {
    const product = await this.Product.findByPk(id);
    const productData = product.toJSON();
    productData.images = productData.images.split(",");
    const user = await this.User.findOne({
      attributes: ["user_name"],
      where: {
        id: productData.seller_id,
      },
      raw: true,
    });
    productData.seller_name = user.user_name;
    const wishCount = await product.getWishList();
    productData.wishCount = wishCount.length;
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
