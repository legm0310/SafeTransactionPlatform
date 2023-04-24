const db = require("../models");
module.exports = {
  signup: async (req, res) => {
    let newUser = {
      role: 1,
      user_name: req.body.user_name,
      email: req.body.email,
      password: req.body.password,
      phone_number: req.body.phone_number,
    };
    try {
      const findUser = await db.User.getUserByPhoneNumber(newUser.phone_number);

      if (findUser != null) res.status(409).json({ result: "exist user" });
      await db.User.create(newUser);
    } catch (err) {
      throw err;
    } finally {
      res.status(200).json({
        result: "signupSuccess.",
      });
    }
  },

  login: async (req, res) => {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };

    const findUser = await db.User.findOne({ where: { email: user.email } });
    if (!findUser) res.status(403).json({ result: "user not found" });
    else if (!(await findUser.validPassword(user.password, findUser.password)))
      res.status(403).json({
        result: "Invalid password",
      });
    else
      res.status(200).json({
        result: "loginSuccess",
      });
  },
};
