const { Container } = require("typedi");
const { catchAsync } = require("../utils");

module.exports = {
  // addProduct: catchAsync(async (req, res) => {
  //   const prodServiceInstance = await Container.get("productService");
  //   const product = await prodServiceInstance.addProduct(req.body);
  //   res.status(201).json({
  //     addProductSuccess: true,
  //     product: product,
  //   });
  // }),
  //   getChats: catchAsync(async (req, res) => {
  //     const prodServiceInstance = await Container.get("productService");
  //     const params = req.query;
  //     const { pages, prodList } = await prodServiceInstance.getProducts(params);
  //     res.status(200).json({
  //       getProductsSuccess: true,
  //       totalPage: pages,
  //       products: prodList,
  //     });
  //   }),
};
