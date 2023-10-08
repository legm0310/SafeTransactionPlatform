const { Container } = require("typedi");
const { BadRequestError, NotFoundError } = require("../utils/generalError");
const { extractProductsList } = require("../utils");

class UserService {
  constructor() {
    this.User = Container.get("userModel");
  }

  async createUser(newUserData) {
    if (await this.User.getUserByPhoneNumber(newUserData.phone_number)) {
      throw new BadRequestError("Phone number already exists");
    }
    if (await this.getUserByEmail(newUserData.email)) {
      throw new BadRequestError("Email already exists");
    }

    return await this.User.create(newUserData);
  }

  async getUserById(id) {
    const user = await this.User.findOne({
      where: {
        id: id,
      },
      attributes: ["user_name", "created_at", "introduce"],
    });
    return user;
  }

  async getUserByEmail(email) {
    const user = await this.User.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }

  async updateUserById(userId, updateData) {
    const user = await this.getUserById(+userId);
    if (!user) throw new NotFoundError("User not found");
  }

  async deleteUserById(userId) {
    const user = await this.getUserById(+userId);
    if (!user) throw new NotFoundError("User not found");
    return await this.User.destroy({
      where: {
        id: userId,
      },
      force: true,
    });
  }

  // WishList Method

  /** 위시리스트 추가 메소드
   * @description 위시리스트 추가 로직
   * @param {object} wishListData - db에 저장할 위시리스트 데이터, req.body
   * @param {integer} wishListData.userId - 사용자 ID
   * @param {integer} wishListData.productId - 제품 ID
   */
  async addWishList(wishListData) {
    console.log(typeof +wishListData.userId);
    const user = await this.User.findByPk(+wishListData.userId);
    const hasWishList = await user.getWishList({
      where: { id: +wishListData.productId },
    });
    console.log(hasWishList);
    if (hasWishList.length > 0) {
      throw new BadRequestError("Wishlist already exists");
    }
    const wishList = await user.addWishList(+wishListData.productId);
    return wishList;
  }

  /** 위시리스트 GET 메소드
   * @description 위시리스트 GET 로직
   * @param {integer} userId - 사용자 ID
   */
  async getWishListById(userId) {
    // 스페셜 메소드를 사용하기 위해 user 정보를 갖고 옴
    const user = await this.User.findByPk(+userId); // 특정 user의 WishList product 정보를 get 해옴
    const wishList = await user.getWishList({
      attributes: ["id", "title", "price", "images"],
      joinTableAttributes: [],
    });
    const wishProductData = extractProductsList(wishList);
    return wishProductData;
  }

  /** 위시리스트 DELETE 메소드
   * @description 위시리스트 DELETE 로직
   * @param {object} wishListData - db에서 삭제할 위시리스트 데이터
   * @param {integer} wishListData.userId - 사용자 ID
   * @param {integer} wishListData.productId - 제품 ID
   * */
  async deleteWishList(wishListData) {
    const user = await this.User.findByPk(+wishListData.userId);

    const hasWishList = await user.getWishList({
      where: { id: +wishListData.productId },
    });
    console.log(hasWishList);
    if (hasWishList.length === 0) {
      throw new NotFoundError("Wishlist not found");
    }
    const result = await user.removeWishList(+wishListData.productId);
    return result;
  }
}

module.exports = UserService;
