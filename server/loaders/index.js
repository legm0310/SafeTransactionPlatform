const sequelizeLoader = require("./sequelize");
const expressLoader = require("./express");
const dependencyInjectorLoader = require("./dependencyInjector");
const models = require("../models/index");
const services = require("../services/index");

const init = async ({ expressApp }) => {
  try {
    console.log(`___________________________________________`);
    const sequelizeDbConnection = await sequelizeLoader();
    console.log("👌 Mysql DB loaded and connected");
  } catch (err) {
    console.log(`🔥 Error on Sequelize Loader: `);
    throw err;
  }

  const userModel = {
    name: "userModel",
    model: models.User,
  };

  const AuthService = {
    name: "AuthService",
    service: services.AuthService,
  };

  await dependencyInjectorLoader({
    models: [userModel],
    services: [AuthService],
  });
  console.log("👌 Dependency Injector loaded");

  await expressLoader({ app: expressApp });
  console.log("👌 Express loaded");
};

module.exports = init;
