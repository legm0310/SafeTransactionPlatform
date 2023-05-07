const express = require("express");
const router = express.Router();
const middleware = require("../middlewares");
const productController = require("../controllers").productController;

/** product 관련 라우팅 함수
 * @param {Function} app 라우터 설정을 위한 express.Router()
 * @todo 유효성 검증 추가
 *
 */
module.exports = (app) => {
  app.use("/product", router);
  router.post("/product", productController.postProduct);
  router.get("/product", productController.getProduct);
  router.put("/product", productController.updateProduct);
  router.delete("/product", productController.deleteProduct);
};
