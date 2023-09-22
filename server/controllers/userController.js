const { Container } = require("typedi");
const { catchAsync } = require("../utils");

module.exports = {
  getWishList: catchAsync(async (req, res) => {
    const userServiceInstance = await Container.get("userService");
    const userId = req.params.id;
    const wishList = await userServiceInstance.getWishListById(userId);
    res.status(200).json({
      getWishListSuccess: true,
      wishList: wishList,
    });
  }),

  addWishList: catchAsync(async (req, res) => {
    const userServiceInstance = await Container.get("userService");
    const wishList = await userServiceInstance.addWishList(req.body);
    res.status(201).json({
      addWishListSuccess: true,
      wishList: wishList,
    });
  }),

  deleteWishList: catchAsync(async (req, res) => {
    const userServiceInstance = await Container.get("userService");
    const productId = req.params.id;
    const userId = req.body.user_id;
    const wishData = {
      productId: productId,
      userId: userId,
    };
    await userServiceInstance.deleteWishList(wishData);
    res.status(200).json({
      deleteWishList: true,
    });
  }),
};
