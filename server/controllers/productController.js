const { Container } = require("typedi");
const config = require("../config");
const { catchAsync } = require("../utils");

module.exports = {
  addProduct: catchAsync(async (req, res) => {
    const prodServiceInstance = await Container.get("productService");
    const data = {
      prodData: {
        ...req.body,
        seller_wallet: req.body.address,
      },
      hashDataArr: [
        req.body.title,
        req.body.price,
        req.body.category,
        req.body.seller_id,
        req.body.seller_wallet,
      ],
    };
    const product = await prodServiceInstance.addProduct(data);
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

  getDepositedProducts: catchAsync(async (req, res) => {
    const prodServiceInstance = await Container.get("productService");
    const productIds = req.body.productIds;
    console.log(productIds);
    const products = await prodServiceInstance.getProducts(productIds);
    res.status(200).json({
      getPurchasedProductsSuccess: true,
      products: products,
    });
  }),

  getRecentProducts: catchAsync(async (req, res) => {
    const prodServiceInstance = await Container.get("productService");
    const params = req.query;
    const recentProducts = await prodServiceInstance.getProducts(params);
    res.status(200).json({
      getRecentProductsSuccess: true,
      products: recentProducts,
      count: recentProducts.count,
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
    res.status(200).json({
      deleteProductSuccess: true,
    });
  }),

  deposit: catchAsync(async (req, res) => {
    const prodServiceInstance = await Container.get("productService");
    const productId = req.params.id;
    const updatedProd = await prodServiceInstance.updateProductStatus(
      "RESERVED",
      productId
    );
    res.status(200).json({
      updated: updatedProd,
    });
  }),

  release: catchAsync(async (req, res) => {
    const prodServiceInstance = await Container.get("productService");
    const productId = req.params.id;
    const updatedProd = await prodServiceInstance.updateProductStatus(
      "SOLD",
      productId
    );
    res.status(200).json({
      updated: updatedProd,
    });
  }),
};
