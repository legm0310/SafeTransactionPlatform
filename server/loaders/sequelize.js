const db = require("../models");
module.exports = async () => {
  await db.sequelize.sync({ force: false }).catch((err) => {
    console.log(err);
    process.exit(err.code);
  });
};
