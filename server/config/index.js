const path = require("path");
const dotenv = require("dotenv");
let envFound;
if (process.env.NODE_ENV === "production") {
  envFound = dotenv.config({
    path: path.join(__dirname, "../.env"),
  });
} else if (process.env.NODE_ENV === "development") {
  envFound = dotenv.config({
    path: path.join(__dirname, "../.env.development"),
  });
} else envFound = dotenv.config();

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  //server 구동 환경
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),

  //db 설정 (development, production)
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
    timezone: "+09:00", // DB에 저장할 때 시간 설정
    dialectOptions: {
      charset: "utf8mb4",
      dateStrings: true,
      typeCast: true,
      // DB에서 가져올 때 시간 설정
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
    timezone: "+09:00", // DB에 저장할 때 시간 설정
    dialectOptions: {
      charset: "utf8mb4",
      dateStrings: true,
      typeCast: true,
      // DB에서 가져올 때 시간 설정
    },
  },

  //jwt auth token
  jwtAccessSecret: process.env.JWT_SECRET_ACCESS,
  jwtRefreshSecret: process.env.JWT_SECRET_REFRESH,
  jwtAlgorithm: null,
  //만료된 acToken으로 새 acToken을 발급 받을 수 있는 시간
  reissueTimeoutInterval: process.env.REISSUE_TIMEOUT_INTERVAL,

  //aws
  awsS3BucketName: process.env.AWS_S3_BUCKET_NAME,
  awsS3Config: {
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  },

  //cors (production 환경에서만 사용)
  cors: {
    origin: process.env.CORS_ORIGIN.split(","),
    credentials: true,
    exposedHeaders: ["Authorization"],
  },

  //cookie 발급 옵션
  cookieSet: {
    domain: process.env.DOMAIN,
    path: "/",
    maxAge: 24 * 6 * 60 * 10000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
  },

  socketOption: {
    cors: {
      origin: process.env.CORS_ORIGIN.split(","),
      allowedHeaders: ["Authorization"],
      credentials: true,
    },
    transports: ["websocket"],
  },
};
