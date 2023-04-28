const express = require("express");

const config = require("./config");

const { init } = require("./loaders");

const app = express();

async function startServer() {
  await init({ expressApp: app });
  app.listen(config.port, () => {
    console.log("#####################################");
    console.log(`🔥 Server listening on port: ${config.port} 🔥`);
    console.log("#####################################");
  });
}

startServer();
