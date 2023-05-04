const db = require("../models");
module.exports = async () => {
  await db.sequelize.sync({ force: true }).catch((err) => {
    console.error(err);
  });
};
