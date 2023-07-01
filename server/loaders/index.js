const http = require("http");
const sequelizeLoader = require("./sequelize");
const config = require("../config");
const expressLoader = require("./express");
const socketLodaer = require("./socket");
const dependencyInjectorLoader = require("./dependencyInjector");
const { ioInit } = require("../utils/socketHandler");

/** 앱 실행 전 필요한 파일들을 로드하는 함수.
 * @description sequelize, MysqlDB 동기화, 의존성 주입, express 미들웨어 로드
 * @description loader 폴더의 index -> sequelize -> dependencyInjector, containerObject -> express 순으로 실행
 * @param {object} options dsdadsadasd
 * @param {Function} options.expressApp 미들웨어를 실행시킬 express app
 *
 */
const init = async ({ expressApp }) => {
  try {
    const sequelizeDbConnection = await sequelizeLoader();
    console.log(`___________________________________________\n`);
    console.log(`✨ NODE_ENV: ${config.nodeEnv} ✨\n`);
    if (!sequelizeDbConnection) {
      console.log("👌 Mysql DB loaded and connected\n");
    }
  } catch (err) {
    console.log(`🔥 Error on Sequelize Loader: `);
    throw err;
  }

  try {
    dependencyInjectorLoader({
      models: require("../models"),
      services: require("../services"),
    });

    console.log("👌 Dependency Injector loaded\n");
  } catch (err) {
    console.log(`🔥 Error on Dependency Injector Loader: `);
    throw err;
  }

  try {
    const { app } = await expressLoader({ app: expressApp });
    const httpServer = http.createServer(app);
    socketLodaer(ioInit(httpServer));
    await app.set("server", httpServer);

    console.log("👌 Express and Socket loaded\n");
  } catch (err) {
    console.log(`🔥 Error on Express Loader: `);
    throw err;
  }
};

module.exports = init;
