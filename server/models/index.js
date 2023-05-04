const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config")[env];

const user = require("./user");
const product = require("./product");
const chatRoom = require("./chatRoom");
const chatContent = require("./chatContent");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
const db = {};

db.User = user;
// db.Product = product;
// db.ChatRoom = chatRoom;
// db.ChatContent = chatContent;

// console.log(new db.User());
Object.keys(db).forEach((name) => {
  db[name].init(sequelize);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
