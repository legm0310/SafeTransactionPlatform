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

module.exports = {
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  jwtAccessSecret: process.env.JWT_SECRET_ACCESS,
  jwtRefreshSecret: process.env.JWT_SECRET_REFRESH,
  jwtAlgorithm: null,

  reissueTimeoutInterval: process.env.REISSUE_TIMEOUT_INTERVAL,

  awsS3BucketName: process.env.AWS_S3_BUCKET_NAME,
  awsS3Config: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  },

  cors: {
    origin: process.env.CORS_ORIGIN.split(","),
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
