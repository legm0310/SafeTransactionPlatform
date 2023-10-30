class MemoryStore {
  constructor() {
    this.users = new Map();
  }
  async set(key, value) {
    return new Promise((resolve) => {
      this.users.set(key, value);
      resolve();
    });
  }

  async get(key) {
    return new Promise((resolve) => {
      const data = this.users.get(key);
      resolve(data);
    });
  }

  async delete(key) {
    return new Promise((resolve) => {
      this.users.delete(key);
      resolve();
    });
  }

  async entries() {
    return new Promise((resolve) => {
      const data = this.users.entries();
      resolve(data);
    });
  }
}

class RedisStore {
  constructor(redisClient) {
    this.redis = redisClient;
  }

  async set(key, value) {
    await this.redis.hset("users", key, JSON.stringify(value));
    // await this.redis.set(key, JSON.stringify(value))
  }

  async get(key) {
    const data = await this.redis.hget("users", key);
    return JSON.parse(data);
    // return await this.redis.get("users", JSON.parse(key));
  }

  async delete(key) {
    await this.redis.hdel("users", key);
  }

  async entries() {
    const usersHash = await this.redis.hgetall("users");
    const entriesArr = [];
    for (let key in usersHash) {
      entriesArr.push([key, JSON.parse(usersHash[key])]);
    }
    return entriesArr;
  }
}

module.exports = { MemoryStore, RedisStore };
