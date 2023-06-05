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
    res.status(200).json({
      getProductsSuccess: true,
      products: products,
    });
  }),

  getRecentProducts: catchAsync(async (req, res) => {
    const prodServiceInstance = await Container.get("productService");
    const lastId = parseInt(req.query.lastId, 10);
    const recentProducts = await prodServiceInstance.getRecentProducts(lastId);
    res.status(200).json({
      getRecentProductSuccess: true,
      products: recentProducts,
    });
  }),

  getProduct: catchAsync(async (req, res) => {
    const prodServiceInstance = await Container.get("productService");
    const productId = req.params.id;
    const product = await prodServiceInstance.getProductById(productId);
    res.status(200).json({
      getProductSuccess: true,
      product: product,
    });
  }),

  updateProduct: catchAsync(async (req, res) => {
    const prodServiceInstance = await Container.get("productService");
    const productId = req.params;
    res.status(200).json({});
  }),

  deleteProduct: catchAsync(async (req, res) => {
    const prodServiceInstance = await Container.get("productService");
    const productId = req.params;
    res.status(200).json({});
  }),
};
