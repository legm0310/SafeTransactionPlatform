const { Container } = require("typedi");
const { BadRequestError, NotFoundError } = require("../utils/generalError");

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
    const user = await this.User.findByPk(id);
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
    const user = await this.getUserById(userId);
    if (!user) throw new NotFoundError("User not found");
  }

  async deleteUserById(userId) {
    const user = await this.getUserById(userId);
    if (!user) throw new NotFoundError("User not found");
    return await this.User.destroy({
      where: {
        id: userId,
      },
      force: true,
    });
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

module.exports = UserService;
