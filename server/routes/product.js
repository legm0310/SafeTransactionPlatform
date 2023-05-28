const express = require("express");
const router = express.Router();
const { isAuth, uploader } = require("../middlewares");
const productController = require("../controllers").productController;

/** product 관련 라우팅 함수
 * @param {Function} app 라우터 설정을 위한 express.Router()
 * @todo 유효성 검증 추가
 *
 */
module.exports = (app) => {
  app.use("/product", router);

  // router.post("/", uploader, productController.addProduct);
  router.post("/", uploader, (req, res) => {
    console.log(Array.from(req.files.values()));
    console.log(req.file);
    res.sendStatus(200).end();
  });
  router.get("/", productController.getProduct);
  router.get("/:productId", productController.getProduct);
  router.put("/:productId", productController.updateProduct);
  router.delete("/:productId", productController.deleteProduct);
};
