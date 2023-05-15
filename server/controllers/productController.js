const { Container } = require("typedi");
const config = require("../config");
const catchAsync = require("../utils/catchAsync");

module.exports = {
  addProduct: catchAsync(async (req, res) => {
    const prodServiceInstance = await Container.get("productService");
    req.body.user_id = res.locals.userId;
    await prodServiceInstance.addProduct(req.body);
    res.status(201).json({
      addProductSuccess: true,
      product: product,
    });
  }),

  getProduct: catchAsync(async (req, res) => {
    const prodServiceInstance = await Container.get("productService");
    const productId = req.params;
    await prodServiceInstance.getProduct(productId);
  }),

  updateProduct: catchAsync(async (req, res) => {
    const prodServiceInstance = await Container.get("productService");
    const productId = req.params;
  }),

  deleteProduct: catchAsync(async (req, res) => {
    const prodServiceInstance = await Container.get("productService");
    const productId = req.params;
  }),
};
