const { Container } = require("typedi");
const passport = require("passport");
const ApiError = require("../utils/ApiError");
const Unauthorized = new ApiError(401, "Unauthorized", "Please authenticate");
const loginAgain = new ApiError(
  401,
  "Unauthorized",
  "Authentication has expired. Please login again "
);

const handleAccessToken = async (req, res, next) => {
  passport.authenticate(
    "access",
    { session: false },
    async (err, user, info) => {
      if (info && info.message == "jwt expired") {
        //... passport.authenticate("refresh")
        return await handleRefreshToken(req, res, next);
      }

      if (err || info || !user) {
        return (
          console.log("🔥", err ? `err: ${err}` : `info: ${info}`),
          next(Unauthorized)
        );
      }

      req.userId = user.sub;
      return next();
    }
  )(req, res, next);
};

const handleRefreshToken = async (req, res, next) => {
  const tokenService = Container.get("tokenService");
  passport.authenticate(
    "refresh",
    { session: false },
    async (err, user, info) => {
      if (info && info.message == "jwt expired") {
        return console.log("🔥", loginAgain), next(loginAgain);
      }

      if (err || info || !user) {
        return (
          console.log("🔥", err ? `err: ${err}` : `info: ${info}`),
          next(Unauthorized)
        );
      }

      const { refreshToken } = await req.cookies;
      if (refreshToken !== user.tokenData.refresh_token) {
        return console.log("🔥", Unauthorized), next(Unauthorized);
      }

      const { accessToken, exp } = await tokenService.genAccessToken(
        user.tokenData.user_id
      );

      await tokenService.updateReissueTimeout(
        new Date(exp * 1000 + 20),
        user.tokenData.user_id
      );

      await res.setHeader("Authorization", `Bearer ${accessToken}`);

      return next();
    }
  )(req, res, next);
};

const isAuth = async (req, res, next) => {
  await handleAccessToken(req, res, next);
};

module.exports = isAuth;

//access tokenService 검사 -> 유효 -> 인증 통과

//access -> 만료   30
//access tokenService 검사 -> 만료 -> refresh tokenService 검사 -> 유효 -> accesstoken 재발금
//access tokenService 검사 -> 만료 -> refresh tokenService 검사 -> 만료 -> 재로그인
