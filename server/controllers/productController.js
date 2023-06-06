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
    const params = req.query;
    const { pages, prodList } = await prodServiceInstance.getProducts(params);
    res.status(200).json({
      getProductsSuccess: true,
      totalPage: pages,
      products: prodList,
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
    await prodServiceInstance.updateProduct(productId);
    res.status(200).json({});
  }),

  deleteProduct: catchAsync(async (req, res) => {
    const prodServiceInstance = await Container.get("productService");
    const productId = req.params;
    await prodServiceInstance.deleteProduct(productId);
    res.status(200).json({});
  }),
};
