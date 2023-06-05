const db = require("../models");
module.exports = async () => {
  const force = true;
  await db.sequelize
    .sync({ force: force })
    .then(() => {
      if (force) {
        db.User.create({
          role: 0,
          user_name: "t",
          email: "t@t.com",
          phone_number: "12312341234",
          password: "1234",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      process.exit(err.code);
    });
};
