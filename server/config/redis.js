const Redis = require("ioredis");
const config = require("../config");

const redisClient = new Redis(config.redisConfig);
redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

module.exports = { redisClient };
