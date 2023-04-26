const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

const user = require("./user");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
const db = {};

db.User = user;

Object.keys(db).forEach((name) => {
  db[name].init(sequelize);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// db.User = require("./user")(sequelize, Sequelize);
// db.Product = require("./product")(sequelize, Sequelize);

module.exports = db;
