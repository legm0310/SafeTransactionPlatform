const cookie = require("cookie");
const { Container } = require("typedi");
const config = require("../config");
const passport = require("passport");
const { UnauthorizedError } = require("../utils");
const Unauthorized = new UnauthorizedError("Please authenticate");
const loginAgain = new UnauthorizedError(
  "Authentication has expired. Please login again "
);

//isAuth -> handleAccessToken -> if문 분기에 따라 handleRefreshToken 실행
/**
 * @TODO
 * auth fail시 error가 아닌 false데이터 반환
 */
const handleAccessToken = async (req, res, next) => {
  const tokenService = Container.get("tokenService");
  passport.authenticate(
    "access",
    { session: false },
    async (err, user, info) => {
      if (info && info.message == "jwt expired") {
        //... passport.authenticate("refresh")
        return await handleRefreshToken(req, res, next);
      }

      if (err || info || !user) {
        if (req.cookies.refreshToken) {
          await tokenService.removeToken(req.cookies.refreshToken);
        }
        return (
          console.log("🔥", err ? `err: ${err}` : `info: ${info}`),
          next(Unauthorized)
        );
      }
      res.locals.userId = user.sub;
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
      console.log("cook", refreshToken);
      if (refreshToken !== user.tokenData.refresh_token) {
        return console.log("🔥", Unauthorized), next(Unauthorized);
      }

      const { accessToken, exp } = await tokenService.genAccessToken(
        user.tokenData.user_id
      );

      await tokenService.updateReissueTimeout(
        new Date((exp + parseInt(config.reissueTimeoutInterval)) * 1000),
        user.tokenData.user_id
      );

      await res.setHeader("Authorization", `Bearer ${accessToken}`);
      res.locals.userId = user.tokenData.user_id;
      return next();
    }
  )(req, res, next);
};

const handleSocketAccessToken = async (socket, next) => {
  const tokenService = Container.get("tokenService");
  passport.authenticate(
    "access",
    { session: false },
    async (err, user, info) => {
      if (info && info.message == "jwt expired") {
        //... passport.authenticate("refresh")
        return await handleSocketRefreshToken(socket, next);
      }

      if (err || info || !user) {
        const parsedCookies = cookie.parse(socket.request.headers.cookie || "");
        const refreshToken = parsedCookies["refreshToken"];
        if (refreshToken) {
          await tokenService.removeToken(refreshToken);
        }
        return (
          console.log("🔥", err ? `err: ${err}` : `info: ${info}`),
          next(Unauthorized)
        );
      }
      socket.userId = user.sub;
      return next();
    }
  )(socket, {}, next);
};

const handleSocketRefreshToken = async (socket, next) => {
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

      const parsedCookies = cookie.parse(socket.request.headers.cookie || "");
      const refreshToken = parsedCookies["refreshToken"];
      console.log("refreshToken", refreshToken);
      if (refreshToken !== user.tokenData.refresh_token) {
        return console.log("🔥", Unauthorized), next(Unauthorized);
      }

      const { accessToken, exp } = await tokenService.genAccessToken(
        user.tokenData.user_id
      );

      await tokenService.updateReissueTimeout(
        new Date((exp + parseInt(config.reissueTimeoutInterval)) * 1000),
        user.tokenData.user_id
      );

      await socket.emit("issueAccessToken", {
        accessToken: `Bearer ${accessToken}`,
      });
      socket.userId = user.tokenData.user_id;
      return next();
    }
  )(socket, {}, next);
};

const isAuth = async (req, res, next) => {
  await handleAccessToken(req, res, next);
};

const isSocketAuth = async (socket, next) => {
  await handleSocketAccessToken(socket, next);
};

module.exports = { isAuth, isSocketAuth };

//access tokenService 검사 -> 유효 -> 인증 통과

//access -> 만료   30
//access tokenService 검사 -> 만료 -> refresh tokenService 검사 -> 유효 -> accesstoken 재발금
//access tokenService 검사 -> 만료 -> refresh tokenService 검사 -> 만료 -> 재로그인
