const { Container } = require("typedi");

module.exports = {
  signup: async (req, res, next) => {
    console.log(req.body);

    try {
      const authServiceInstance = await Container.get("authService");
      const { user, accessToken, refreshToken } =
        await authServiceInstance.signup(req.body);
      res.setHeader("Authorization", `Bearer ${accessToken}`);
      res.cookie("refreshToken", refreshToken, {
        domain: "localhost",
        path: "/",
        maxAge: 24 * 6 * 60 * 10000,
        sameSite: "none",
        httpOnly: true,
        secure: true,
      });
      res.status(201).json({
        signupSuccess: true,
        user: user,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } catch (err) {
      console.log("🔥", err);
      return next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const authServiceInstance = await Container.get("authService");
      const { user, accessToken, refreshToken } =
        await authServiceInstance.login(req.body);
      res.setHeader("Authorization", `Bearer ${accessToken}`);
      res.cookie("refreshToken", refreshToken, {
        domain: "localhost",
        path: "/",
        maxAge: 24 * 6 * 60 * 10000,
        sameSite: "none",
        httpOnly: true,
        secure: true,
      });
      res.status(200).json({
        loginSuccess: true,
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
