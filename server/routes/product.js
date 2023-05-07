const express = require("express");
const router = express.Router();
const middleware = require("../middlewares");
const userController = require("../controllers/authController");

/** product 관련 라우팅 함수
 * @param {Function} app 라우터 설정을 위한 express.Router()
 * @todo 유효성 검증 추가
 *
 */
module.exports = (app) => {
  app.use("/product", router);

  router.get("/product", userController.login);
  router.post("/product", userController.signup);
  router.put("/product", userController.signup);
  router.delete("/product", userController.signup);
};
