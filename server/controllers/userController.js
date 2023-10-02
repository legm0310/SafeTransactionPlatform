const { Container } = require("typedi");
const { catchAsync } = require("../utils");

module.exports = {
  getUser: catchAsync(async (req, res) => {
    const userServiceInstance = await Container.get("userService");
    res.status(200).json({
      getUser: true,
    });
  }),

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
    const wishData = {
      productId: req.params.id,
      userId: res.locals.userId,
    };
    const result = await userServiceInstance.deleteWishList(wishData);
    res.status(200).json({
      deleteWishListSuccess: !!result,
      deletedProductId: wishData.productId,
    });
  }),
};
