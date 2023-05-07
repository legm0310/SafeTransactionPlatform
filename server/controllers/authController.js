const { Container } = require("typedi");
const config = require("../config");

module.exports = {
  /** 회원가입 함수
   * @description 회원가입에 대한 에러처리, 리턴
   * @returns {signupSuccess} dsdad
   * @returns {user}
   * @returns {accessToken}
   * @returns {refreshToken}
   */
  signup: async (req, res, next) => {
    console.log(req.body);

    try {
      const authServiceInstance = await Container.get("authService");
      const { user, accessToken, refreshToken } =
        await authServiceInstance.signup(req.body);
      res.setHeader("Authorization", `Bearer ${accessToken}`);
      res.cookie("refreshToken", refreshToken, config.cookieSet);
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
      res.cookie("refreshToken", refreshToken, config.cookieSet);
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

  logout: async (req, res, next) => {
    try {
      const authServiceInstance = await Container.get("authService");
      await authServiceInstance.logout(req.cookies.refreshToken);
      res.status(200).json({
        logoutSuccess: true,
      });
    } catch (err) {
      console.log("🔥", err);
      return next(err);
    }
  },

  check: async (req, res, next) => {
    try {
      const authServiceInstance = await Container.get("authService");
      const userData = await authServiceInstance.check(req.userId);
      res.status(200).json({
        authCheckSuccess: true,
        user: userData,
      });
    } catch (err) {
      console.log("🔥", err);
      return next(err);
    }
  },
};
