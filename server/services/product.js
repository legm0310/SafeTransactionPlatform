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

  async getWishListById(params) {
    // 스페셜 메소드를 사용하기 위해 user 정보를 갖고 옴
    const user = await this.User.findByPk(params);
    console.log(user);
    // 특정 user의 WishList 정보를 get 해옴
    const wishList = await user.getWishList();
    const wishProductData = wishList.map((value) => ({
      title: value.title,
      price: value.price,
      image: value.images,
    }));
    // extractProductsList 이용 실패
    console.log("wishProductData", wishProductData);

    return wishProductData;
  }

  async addWishList(wishListData) {
    const user = await this.User.findOne({
      where: wishListData.user_id,
    });
    const wishList = await user.addWishList(wishListData.product_id);
    return wishList;
  }

  // 추후 user_id가 body가 아닌 local.id로 변경 예정
  async deleteWishList(wishListData) {
    const user = await this.User.findByPk(wishListData.userId);
    const wishListIdToRemove = wishListData.productId;
    const wishList = await user.removeWishList(wishListIdToRemove);
    return wishList;
  }
}


module.exports = ProductService;
