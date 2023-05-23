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
}

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
console.log(JSON.parse(process.env.CORS_ORIGIN));
module.exports = {
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  jwtAccessSecret: process.env.JWT_SECRET_ACCESS,
  jwtRefreshSecret: process.env.JWT_SECRET_REFRESH,
  jwtAlgorithm: null,

  reissueTimeoutInterval: process.env.REISSUE_TIMEOUT_INTERVAL,

  awsRegion: process.env.AWS_REGION,
  awsS3BucketName: process.env.AWS_S3_BUCKET_NAME,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACC,
  cors: {
    origin: JSON.parse(process.env.CORS_ORIGIN),
    credentials: true,
    exposedHeaders: ["Authorization"],
  },

  cookieSet: {
    domain: process.env.DOMAIN,
    path: "/",
    maxAge: 24 * 6 * 60 * 10000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
  },

  db: {
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
};
