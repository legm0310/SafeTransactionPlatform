const express = require("express");
const route = express.Router();
const userController = require("../controllers/userController");

// router.post("/signup", userController.signup);
// router.post("/login", userController.login);

module.exports = (app) => {
  app.use("/user", route);

  route.post("/signup", userController.signup);
  route.post("/login", userController.login);
};
