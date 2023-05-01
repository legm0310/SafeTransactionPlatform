const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = class Authentication {
  static isToken(token) {
    return /Bearer\s[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(
      token
    );
  }

  static async genAccessToken(userId) {
    const payload = {
      id: userId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 25,
    };
    const token = jwt.sign(payload, config.jwtAccessSecret);
    return token;
  }

  static async genRefreshToken(userId) {
    const payload = {
      id: userId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 80,
    };
    const token = jwt.sign(payload, config.jwtRefreshSecret);
    return token;
  }

  //type==0 --> access,  type==1 --> refresh
  static async verifyToken(type, token) {
    const tokenData = jwt.verify(
      token,
      type == 0 ? config.jwtAccessSecret : config.jwtRefreshSecret
    );
    console.log(tokenData);
    if (tokenData.iat > Math.floor(Date.now() / 1000))
      return { payload: null, verifyResult: false };
    if (tokenData.exp <= Math.floor(Date.now() / 1000))
      return { payload: null, verifyResult: false };
    return { payload: tokenData, verifyResult: true };
  }
};
