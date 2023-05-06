const express = require("express");
const router = express.Router();
const middleware = require("../middlewares");
const { validationResult } = require("express-validator");
const authController = require("../controllers/authController");

/**
 * @TODO
 * 유효성 검증 추가
 *
 */
module.exports = (app) => {
  app.use("/auth", router);

  router.get("/authCheckTest", middleware.isAuth, (req, res) => {
    console.log(res.getHeaders().authorization);
    res.send("clear");
  });

  router.post("/signup", authController.signup);
  router.post("/login", authController.login);
};
