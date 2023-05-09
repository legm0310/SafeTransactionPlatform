const { Container } = require("typedi");

module.exports = {
  postProduct: async (req, res, next) => {
    try {
      const prodServiceInstance = await Container.get("productService");
    } catch (err) {
      console.log("🔥", err);
      return next(err);
    }
  },
  getProduct: async (req, res, next) => {
    try {
      const prodServiceInstance = await Container.get("productService");
    } catch (err) {
      console.log("🔥", err);
      return next(err);
    }
  },
  updateProduct: async (req, res, next) => {
    try {
      const prodServiceInstance = await Container.get("productService");
    } catch (err) {
      console.log("🔥", err);
      return next(err);
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const prodServiceInstance = await Container.get("productService");
    } catch (err) {
      console.log("🔥", err);
      return next(err);
    }
  },
};
