const { Container } = require("typedi");
const jwt = require("jsonwebtoken");
const config = require("../config");
const Unauthorized = new Error("Unauthorized. Please login");
Unauthorized.name = "Unauthorized";

const isAuth = async (req, res, next) => {
  const User = Container.get("userModel");
  const jwtUtil = Container.get("jwtAuth");
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.split(" ")[1])
    return console.log("🔥", Unauthorized), next(Unauthorized);

  let accessToken = authHeader.split(" ")[1];

  //access token 검증
  try {
    const { payload, verifyResult } = await jwtUtil.verifyToken(0, accessToken);
    console.log(verifyResult);
    if (!verifyResult) {
      return console.log("🔥", Unauthorized), next(Unauthorized);
    }

    req.userId = payload.id;
    return next();
  } catch (err) {
    if (err.name !== "TokenExpiredError") {
      return console.log("🔥", Unauthorized), next(Unauthorized);
    }
  }
  //access token 기간 만료시 refresh token 검증
  let { refreshToken } = req.cookies;

  if (!refreshToken || refreshToken == "invalidtoken") {
    return console.log("🔥", Unauthorized), next(Unauthorized);
  }

  try {
    const payload = await jwtUtil.verifyToken(1, refreshToken);
    const searchUser = await User.getUserByToken(refreshToken);

    if (refreshToken !== searchUser.dataValues.refresh_token) {
      console.log("🔥", Unauthorized), next(Unauthorized);
    }

    const newAccessToken = await jwtUtil.genAccessToken(payload.id);
    res.setHeader("Authorization", `Bearer ${newAccessToken}`);

    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      const expired = new Error(
        "authentication has expired. Please login again"
      );
      expired.name = "Unauthorized";
      return console.log("🔥", expired), next(expired);
    }
    return console.log("🔥", Unauthorized), next(Unauthorized);
  }
};

//access token 검사 -> 유효 -> 인증 통과
//access token 검사 -> 만료 -> refresh token 검사 -> 유효 -> accesstoken 재발금
//access token 검사 -> 만료 -> refresh token 검사 -> 만료 -> 재로그인
module.exports = isAuth;
