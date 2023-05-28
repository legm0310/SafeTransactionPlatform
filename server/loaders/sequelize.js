const db = require("../models");
module.exports = async () => {
  await db.sequelize.sync({ force: false }).catch((err) => {
    console.error(err);
  });
};
