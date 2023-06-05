const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { Container } = require("typedi");
const config = require("../config");
const { UnauthorizedError } = require("../utils");

const cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["refreshToken"];
  }
  return token;
};

const accessOptions = {
  secretOrKey: config.jwtAccessSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
    const reissueTimeout = tokenValues.reissue_timeout.getTime();

    console.log("재생성 만료기간", reissueTimeout / 1000);
    console.log("현재 타임스탬프", Math.floor(Date.now() / 1000));

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
