const db = require("../models");
module.exports = async () => {
  const force = false;
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
        db.User.create({
          role: 0,
          user_name: "a",
          email: "a@a.com",
          phone_number: "23423452345",
          password: "1234",
        });
        db.User.create({
          role: 0,
          user_name: "b",
          email: "b@b.com",
          phone_number: "34534563456",
          password: "1234",
        });
        db.User.create({
          role: 0,
          user_name: "c",
          email: "c@c.com",
          phone_number: "45645674567",
          password: "1234",
        });
        db.User.create({
          role: 0,
          user_name: "d",
          email: "d@d.com",
          phone_number: "56756785678",
          password: "1234",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      process.exit(err.code);
    });
};
