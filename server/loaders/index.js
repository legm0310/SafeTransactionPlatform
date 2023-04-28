const sequelizeLoader = require("./sequelize");
const expressLoader = require("./express");

exports.init = async ({ expressApp }) => {
  const sequelizeDbConnection = await sequelizeLoader();
  console.log("👌 DB loaded and connected!");

  await expressLoader({ app: expressApp });
  console.log("👌 Express loaded");
};
