const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config")[env];

const user = require("./user");
const token = require("./token");
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
db.Token = token;
db.Product = product;
// db.ChatRoom = chatRoom;
// db.ChatContent = chatContent;

// console.log(new db.User());
Object.keys(db).forEach(async (name) => {
  await db[name].init(sequelize);
});
Object.keys(db).forEach((name) => {
  db[name].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
