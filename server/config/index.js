const path = require("path");
const envFound = require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
module.exports = {
  env: process.env.NODE_ENV || "development",
  clientDomain: process.env.DOMAIN,
  port: parseInt(process.env.PORT, 10),
  jwtAccessSecret: process.env.JWT_SECRET_ACCESS,
  jwtRefreshSecret: process.env.JWT_SECRET_REFRESH,
  jwtAlgorithm: null,

  cookieSet: {
    // domain: process.env.NODE_ENV === "production" ? clientDomain : "localhost",
    domain: process.env.DOMAIN,
    path: "/",
    maxAge: 24 * 6 * 60 * 10000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
  },

  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
    timezone: "+09:00", // DB에 저장할 때 시간 설정
    dialectOptions: {
      timezone: "+09:00", // DB에서 가져올 때 시간 설정
    },
  },
  production: {},
  test: {},
};
