const { User } = require("../models/index");
module.exports = {
  signup: async (req, res, next) => {
    let newUser = {
      role: 1,
      user_name: req.body.user_name,
      email: req.body.email,
      password: req.body.password,
      phone_number: req.body.phone_number,
    };
    try {
      const findUser = await User.getUserByPhoneNumber(newUser.phone_number);

      if (findUser != null) res.status(409).json({ result: "exist user" });
      await User.create(newUser);
      res.status(200).json({
        result: "signupSuccess.",
      });
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res) => {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };

    const findUser = await User.findOne({ where: { email: user.email } });
    if (!findUser) res.status(403).json({ result: "user not found" });
    if (!(await findUser.validPassword(user.password)))
      res.status(403).json({
        result: "Invalid password",
      });
    else {
      const updatedUser = await findUser.genToken();
      res.status(200).json({
        result: "loginSuccess",
        accessToken: updatedUser.access_token,
      });
    }
  },
};
