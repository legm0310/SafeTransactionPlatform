const express = require("express");
const router = express.Router();
const middleware = require("../middlewares");
const userController = require("../controllers/authController");

module.exports = (app) => {
  app.use("/product", router);

  router.get("/product", userController.login);
  router.post("/product", userController.signup);
  router.put("/product", userController.signup);
  router.delete("/product", userController.signup);
};
