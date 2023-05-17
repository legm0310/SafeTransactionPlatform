const sequelizeLoader = require("./sequelize");
const config = require("../config");
const expressLoader = require("./express");
const dependencyInjectorLoader = require("./dependencyInjector");
const {
  modelDependencyArr,
  serviceDependencyArr,
} = require("./containerObject");
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
    console.log(`✨ NODE_ENV: ${config.env} ✨\n`);
    if (!sequelizeDbConnection) {
      console.log("👌 Mysql DB loaded and connected\n");
    }
  } catch (err) {
    console.log(`🔥 Error on Sequelize Loader: `);
    throw err;
  }

  try {
    await dependencyInjectorLoader({
      models: modelDependencyArr,
      services: serviceDependencyArr,
    });

    console.log("👌 Dependency Injector loaded\n");
  } catch (err) {
    console.log(`🔥 Error on Dependency Injector Loader: `);
    throw err;
  }

  try {
    await expressLoader({ app: expressApp });
    console.log("👌 Express loaded\n");
  } catch (err) {
    console.log(`🔥 Error on Express Loader: `);
    throw err;
  }
};

module.exports = init;
