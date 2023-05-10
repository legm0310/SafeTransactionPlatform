const { Container } = require("typedi");
const config = require("../config");
const catchAsync = require("../utils/catchAsync");

module.exports = {
  signup: catchAsync(async (req, res) => {
    console.log(req.body);
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
  }),

  login: catchAsync(async (req, res) => {
    const authServiceInstance = await Container.get("authService");
    const { user, accessToken, refreshToken } = await authServiceInstance.login(
      req.body
    );
    res.setHeader("Authorization", `Bearer ${accessToken}`);
    res.cookie("refreshToken", refreshToken, config.cookieSet);
    res.status(200).json({
      loginSuccess: true,
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  }),

  logout: catchAsync(async (req, res) => {
    const authServiceInstance = await Container.get("authService");
    await authServiceInstance.logout(req.cookies.refreshToken);
    res.clearCookie("refreshToken", { path: "/" });
    res.status(200).json({
      logoutSuccess: true,
    });
  }),

  check: catchAsync(async (req, res) => {
    const authServiceInstance = await Container.get("authService");
    const userData = await authServiceInstance.check(req.userId);
    res.status(200).json({
      authCheckSuccess: true,
      user: userData,
    });
  }),
};
