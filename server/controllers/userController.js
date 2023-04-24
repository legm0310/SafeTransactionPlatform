const User = require("../models/User");
module.exports = {
  signup: async (req, res) => {
    let newUser = {
      user_name: req.body.user_name,
      email: req.body.email,
      password: req.body.password,
      phone_number: req.body.phone_number,
    };
    await User.create(newUser).catch((err) => console.log(err));
    res.status(200).json({
      result: "complete",
      state: 200,
    });
  },
  login: (req, res) => {
    console.log(res.console.log(123));
  },
};
