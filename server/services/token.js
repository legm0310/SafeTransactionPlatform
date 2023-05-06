const { Container } = require("typedi");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const config = require("../config");

class TokenService {
  constructor() {
    this.tokenModel = Container.get("tokenModel");
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
      exp: Math.floor(Date.now() / 1000) + 25,
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

  async genAuthToken(user) {
    //moment: 날짜에 월, 일, 시간, 분 단위로 쉽게 더하고 뺄 수 있는 lib
    //db에 날짜 저장
    const { accessToken, exp } = await this.genAccessToken(user.id);
    const accessTokenExpires = moment().add(60, "minutes");

    const reissueTimeout = moment(exp * 1000).add(20, "s");

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
    const tokenDoc = await this.tokenModel.upsert(tokenForm, condition);
    return tokenDoc;
  }

  //type==0 --> access,  type==1 --> refresh
  async verifyToken(type, token) {
    const tokenData = jwt.verify(
      token,
      type == 0 ? config.jwtAccessSecret : config.jwtRefreshSecret
    );
    console.log(tokenData);
    return { payload: tokenData };
  }

  async getToken(token) {
    return await this.tokenModel.findOne({
      where: {
        refresh_token: token,
      },
    });
  }

  async getTokenByUserId(userId) {
    return await this.tokenModel.findOne({
      where: {
        user_id: userId,
      },
    });
  }

  async updateReissueTimeout(reissueTimeout, userId) {
    return await this.tokenModel.update(
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
