const auth = require("./auth");
const product = require("./product");

const routerLoader = () => {
  const app = require("express").Router();
  auth(app);
  // product(app);
  return app;
};

module.exports = routerLoader;
