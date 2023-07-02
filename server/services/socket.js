const socket = require("socket.io");
const { InternalServerError } = require("../utils");
const config = require("../config");

class SocketService {
  constructor() {
    this.io = null;
  }

  ioInit(server) {
    const cors = {
      ...config.cors,
      origin:
        config.nodeEnv === "production"
          ? config.cors.origin
          : "http://localhost:3000",
    };

    this.io = socket(server, {
      cors: cors,
    });
    return this.io;
  }

  getIo() {
    if (!this.io) throw new InternalServerError("Socket.io is not connected!");
    return this.io;
  }
}

module.exports = SocketService;
