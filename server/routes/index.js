const user = require("./user");

module.exports = () => {
  const app = require("express").Router();
  // product(app);
  user(app);
  return app;
};
