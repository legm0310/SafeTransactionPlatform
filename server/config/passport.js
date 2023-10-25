const cookie = require("cookie");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { Container } = require("typedi");
const config = require("../config");
const { UnauthorizedError } = require("../utils");

const cookieExtractor = function (reqOrSoc) {
  var token = null;
  if (reqOrSoc && reqOrSoc.cookies) {
    token = reqOrSoc.cookies["refreshToken"];
  }
  if (reqOrSoc && reqOrSoc?.handshake?.headers.cookie) {
    const parsedCookies = cookie.parse(reqOrSoc.handshake.headers.cookie);
    token = parsedCookies["refreshToken"];
  }
  return token;
};
const headersExtractor = function (reqOrSoc) {
  var token = null;
  if (reqOrSoc?.headers?.authorization) {
    // console.log("HTTP", reqOrSoc?.headers?.authorization);
    return ExtractJwt.fromAuthHeaderAsBearerToken()(reqOrSoc);
  }
  if (reqOrSoc && reqOrSoc.handshake?.query.token) {
    // console.log("SOCKET", reqOrSoc.handshake?.query.token);
    const parts = reqOrSoc.handshake.query.token.split(" ");
    if (parts.length === 2 && parts[0] === "Bearer") {
      token = parts[1];
    }
  }
  return token;
};

const accessOptions = {
  secretOrKey: config.jwtAccessSecret,
  jwtFromRequest: headersExtractor,
};
const refreshOptions = {
  secretOrKey: config.jwtRefreshSecret,
  jwtFromRequest: cookieExtractor,
};

const accessVerify = async (payload, done) => {
  try {
    console.log(payload, `now: ${Math.floor(Date.now() / 1000)}`);
    return done(null, payload);
  } catch (err) {
    return done(err, false);
  }
};

const refreshVerify = async (payload, done) => {
  const tokenService = await Container.get("tokenService");
  try {
    const tokenData = await tokenService.getTokenByUserId(payload.sub);
    const tokenValues = tokenData.dataValues;
    const reissueTimeout = new Date(
      Date.parse(tokenValues.reissue_timeout)
    ).getTime();

    console.log("exp", reissueTimeout / 1000);
    console.log("now", Math.floor(Date.now() / 1000));

    if (!reissueTimeout || reissueTimeout < Date.now()) {
      throw new UnauthorizedError("Please authenticate");
    } else {
      payload["tokenData"] = tokenValues;
      return done(null, payload);
    }
  } catch (err) {
    done(err, false);
  }
};

const accessStrategy = new JwtStrategy(accessOptions, accessVerify);
const refreshStrategy = new JwtStrategy(refreshOptions, refreshVerify);

module.exports = {
  accessStrategy,
  refreshStrategy,
};
