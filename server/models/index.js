const Sequelize = require("sequelize");
const config = require("../config");
const dbConfig = config[config.nodeEnv];

const user = require("./user");
const token = require("./token");
const product = require("./product");
// const productImage = require("./productImage");
const catagory = require("./catagory");
const wishList = require("./wishList");
const chatRoom = require("./chatRoom");
const chatLog = require("./chatLog");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);
const db = {};

db.User = user;
db.Token = token;
db.Product = product;
db.Catagory = catagory;
db.WishList = wishList;
db.ChatRoom = chatRoom;
db.ChatLog = chatLog;

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
