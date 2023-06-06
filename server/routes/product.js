const express = require("express");
const router = express.Router();
const { isAuth, uploader } = require("../middlewares");
const utils = require("../utils");
const productController = require("../controllers").productController;

/** product 관련 라우팅 함수
 * @param {Function} app 라우터 설정을 위한 express.Router()
 * @todo 유효성 검증 추가
 *
 */
module.exports = (app) => {
  app.use("/products", router);

  router.post("/", isAuth, uploader, productController.addProduct);
  router.get("/", productController.getProducts);
  router.get("/recent", productController.getRecentProducts);
  router.get("/:id", productController.getProduct);
  router.put("/:id", productController.updateProduct);
  router.delete("/:id", productController.deleteProduct);
};
