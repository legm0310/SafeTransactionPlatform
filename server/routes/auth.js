const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares");
const { validationResult } = require("express-validator");
const authController = require("../controllers/").authController;

/** auth 관련 라우팅 함수
 * @param {Function} app 라우터 설정을 위한 express.Router()
 * @todo 유효성 검증 추가
 *
 */
module.exports = (app) => {
  app.use("/auth", router);

  router.post("/signup", authController.signup);
  router.post("/login", authController.login);
  router.get("/logout", authController.logout);
  router.get("/check", isAuth, authController.check);
};