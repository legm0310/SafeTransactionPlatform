const { Container } = require("typedi");

module.exports = {
  signup: async (req, res, next) => {
    console.log(req.body);

    try {
      const authServiceInstance = await Container.get("AuthService");
      const { user, token } = await authServiceInstance.signup(req.body);
      res.status(201).json({
        result: "signupSuccess",
        user: user,
        token: token,
      });
    } catch (err) {
      console.log("🔥", err);
      return next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const authServiceInstance = await Container.get("AuthService");
      const { user, accessToken, refreshToken } =
        await authServiceInstance.login(req.body);
      // res.cookie('refreshToken', refreshToken, {
      //   domain: 'localhost',
      //   path: '/',
      //   maxAge: 24 * 6 * 60 * 10000,
      //   sameSite: 'none',
      //   httpOnly: true,
      //   secure: true,
      // })
      res.status(200).json({
        result: "loginSuccess",
        user: user,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } catch (err) {
      console.log("🔥", err);
      return next(err);
    }
  },
};
