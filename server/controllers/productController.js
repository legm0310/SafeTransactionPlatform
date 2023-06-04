const { Container } = require("typedi");
const config = require("../config");
const { catchAsync } = require("../utils");

module.exports = {
  addProduct: catchAsync(async (req, res) => {
    const prodServiceInstance = await Container.get("productService");
    const product = await prodServiceInstance.addProduct(req.body);
    res.status(201).json({
      addProductSuccess: true,
      product: product,
    });
  }),

  getProducts: catchAsync(async (req, res) => {
    const prodServiceInstance = await Container.get("productService");
    const products = await prodServiceInstance.getProducts();
    res.ststus(202).json({
      getProductsSuccess: true,
      products: products,
    });
  }),

  getRecentProducts: catchAsync(async (req, res) => {
    const prodServiceInstance = await Container.get("productService");
  }),

  getProduct: catchAsync(async (req, res) => {
    const prodServiceInstance = await Container.get("productService");
    const productId = req.params;
    const product = await prodServiceInstance.getProduct(productId);
    res.ststus(202).json({
      getProductSuccess: true,
      product: product,
    });
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
