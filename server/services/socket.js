const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/redis-adapter");
const { setupWorker } = require("@socket.io/sticky");
const { redisClient } = require("../config/redis");
const { InternalServerError } = require("../utils");
const config = require("../config");

class SocketService {
  constructor() {
    this.io = null;
    this.isClusterMode = config.mode === "clusterMode";
  }

  ioInit(server) {
    if (this.isClusterMode) {
      this.io = new Server(server, config.socketOption);

      this.io.adapter(createAdapter(redisClient, redisClient.duplicate()));
      setupWorker(this.io);
    } else {
      this.io = new Server(server, config.socketOption);
    }
    return this.io;
  }

  getIo() {
    if (!this.io) throw new InternalServerError("Socket.io is not connected!");
    return this.io;
  }
}

module.exports = SocketService;
