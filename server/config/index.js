const envFound = require("dotenv").config();

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
module.exports = {
  port: parseInt(process.env.PORT, 10),
  // parseInt(process.env.PORT, 10)
  jwtSecret: process.env.JWT_SECRET_KEY,
  jwtAlgorithm: null,

  development: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "platform",
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "+09:00", // DB에 저장할 때 시간 설정
    dialectOptions: {
      timezone: "+09:00", // DB에서 가져올 때 시간 설정
    },
  },
  production: {},
  test: {},
};
