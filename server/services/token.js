const { Container } = require("typedi");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { UnauthorizedError } = require("../utils/generalError");

class TokenService {
  constructor() {
    this.Token = Container.get("tokenModel");
  }
  isToken(token) {
    return /Bearer\s[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(
      token
    );
  }

  async genAccessToken(userId) {
    const payload = {
      sub: userId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };
    const token = jwt.sign(payload, config.jwtAccessSecret);
    return { accessToken: token, exp: payload.exp };
  }

  async genRefreshToken(userId) {
    const payload = {
      sub: userId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 1000,
    };
    const token = jwt.sign(payload, config.jwtRefreshSecret);
    return token;
  }

  /**
   * @description test: accesstoken - 20초/ 만료 토큰 재생성 가능 시간 - 20초
   * @description production : accesstoken - 60분 / 만료 토큰 재생성 가능 시간 - 만료 이후 60분
   */
  async genAuthToken(user) {
    //moment: 날짜에 월, 일, 시간, 분 단위로 쉽게 더하고 뺄 수 있는 lib
    //db에 날짜 저장
    const { accessToken, exp } = await this.genAccessToken(user.id);
    const accessTokenExpires = moment().add(60, "minutes");

    const reissueTimeout = moment(exp * 1000).add(
      parseInt(config.reissueTimeoutInterval),
      "seconds"
    );

    const refreshToken = await this.genRefreshToken(user.id);
    const refreshTokenExpires = moment().add(3, "days");

    this.saveToken(1, refreshToken, user.id, reissueTimeout.toDate());
    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  }

  async saveToken(accessTokenVersion, token, userId, expires) {
    const tokenForm = {
      access_version: accessTokenVersion,
      refresh_token: token,
      reissue_timeout: expires,
      user_id: userId,
    };
    const condition = { where: { user_id: userId } };
    const tokenDoc = await this.Token.upsert(tokenForm, condition);
    return tokenDoc;
  }

  async removeToken(refreshToken) {
    return await this.Token.destroy({
      where: {
        refresh_token: refreshToken,
      },
      force: true,
    });
  }

  /** passport 도입으로 사용되지 않음
   * @description type==0 --> access,  type==1 --> refresh
   */
  async verifyToken(type, token) {
    const tokenData = jwt.verify(
      token,
      type == 0 ? config.jwtAccessSecret : config.jwtRefreshSecret
    );
    console.log(tokenData);
    return { payload: tokenData };
  }

  async getToken(token) {
    const tokenRecord = await this.Token.findOne({
      where: {
        refresh_token: token,
      },
    });
    return tokenRecord;
  }

  async getTokenByUserId(userId) {
    const tokenRecord = await this.Token.findOne({
      where: {
        user_id: userId,
      },
    });
    return tokenRecord;
  }

  async updateReissueTimeout(reissueTimeout, userId) {
    return await this.Token.update(
      {
        reissue_timeout: reissueTimeout,
      },
      {
        where: {
          user_id: userId,
        },
      }
    );
  }
}

module.exports = TokenService;
