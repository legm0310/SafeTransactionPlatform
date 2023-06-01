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
  app.use("/product", router);
  // router.post("/", uploader, productController.addProduct);
  router.post("/", isAuth, uploader, (req, res) => {
    console.log(req.files);
    console.log(req.files.map((obj) => obj.location));
    utils.deleteProdImg(req.files.map((obj) => obj.location));
    res.sendStatus(200).end();
  });
  router.get("/", productController.getProduct);
  router.get("/:productId", productController.getProduct);
  router.put("/:productId", productController.updateProduct);
  router.delete("/:productId", productController.deleteProduct);
};
