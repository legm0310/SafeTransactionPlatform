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
      hashDataArr: [+req.body.price, +req.body.seller_id, req.body.address],
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
    const data = {
      lastId: req.query?.lastId,
      productIds: req.body,
    };
    const products = await prodServiceInstance.getProducts(data);
    res.status(200).json({
      getPurchasedProductsSuccess: true,
      products: products,
    });
  }),

  getRecentProducts: catchAsync(async (req, res) => {
    const prodServiceInstance = await Container.get("productService");
    console.log(req.query);
    const params = req.query;
    const recentProducts = await prodServiceInstance.getProducts(params);
    res.status(200).json({
      getRecentProductsSuccess: true,
      products: recentProducts,
      count: recentProducts.count,
    });
  }),

  getBatchProducts: catchAsync(async (req, res) => {
    const prodServiceInstance = await Container.get("productService");
    const params = JSON.parse(req.query.productIds);
    const batchProducts = await prodServiceInstance.getBatchProducts(params);
    res.status(200).json({
      getBatchProductsSuccess: true,
      products: batchProducts,
      count: batchProducts.count,
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
    const productData = {
      productId: +req.params.id,
      userId: res.locals.userId,
    };
    const result = await prodServiceInstance.deleteProduct(productData);
    res.status(200).json({
      deleteProductSuccess: !!result,
      deleteProductId: productData.productId,
    });
  }),

  deposit: catchAsync(async (req, res) => {
    const prodServiceInstance = await Container.get("productService");
    const updateData = {
      status: "RESERVED",
      productId: req.params.id,
      txHash: req.body.txHash,
    };
    const updatedProd = await prodServiceInstance.updateProductStatus(
      updateData
    );
    res.status(200).json({
      updated: { updatedProdId: req.params.id, depositTx: req.body.txHash },
    });
  }),

  approve: catchAsync(async (req, res) => {
    const prodServiceInstance = await Container.get("productService");
    const updateData = {
      productId: req.params.id,
      txHash: req.body.txHash,
    };
    const updatedProd = await prodServiceInstance.updateProductStatus(
      updateData
    );
    res.status(200).json({
      updated: { updatedProdId: req.params.id, approveTx: req.body.txHash },
    });
  }),

  release: catchAsync(async (req, res) => {
    const prodServiceInstance = await Container.get("productService");
    const updateData = {
      status: "SOLD",
      productId: req.params.id,
      txHash: req.body.txHash,
    };
    const updatedProd = await prodServiceInstance.updateProductStatus(
      updateData
    );
    res.status(200).json({
      updated: {
        updatedProdId: req.params.id,
        releaseTx: req.body.txHash,
      },
    });
  }),
};
