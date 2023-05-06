const sequelizeLoader = require("./sequelize");
const expressLoader = require("./express");
const dependencyInjectorLoader = require("./dependencyInjector");
const {
  modelDependencyArr,
  serviceDependencyArr,
} = require("./containerObject");

const init = async ({ expressApp }) => {
  try {
    console.log(`___________________________________________`);
    const sequelizeDbConnection = await sequelizeLoader();
    console.log("👌 Mysql DB loaded and connected");
  } catch (err) {
    console.log(`🔥 Error on Sequelize Loader: `);
    throw err;
  }

  await dependencyInjectorLoader({
    models: modelDependencyArr,
    services: serviceDependencyArr,
  });
  console.log("👌 Dependency Injector loaded");

  await expressLoader({ app: expressApp });
  console.log("👌 Express loaded");
};

module.exports = init;
