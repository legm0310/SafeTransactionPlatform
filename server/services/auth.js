const { Container } = require("typedi");

class AuthService {
  constructor() {
    this.User = Container.get("userModel");
    this.jwt = Container.get("jwtAuth");
  }

  async signup(newUser) {
    // console.log(this.User);
    try {
      const searchUser = await this.User.getUserByPhoneNumber(
        newUser.phone_number
      );
      if (searchUser != null) throw new Error("Exist user");

      const userRecord = await this.User.create(newUser);
      if (!userRecord) throw new Error("User cannot be created");

      const token = await this.jwt.genAccessToken(userRecord.id);

      const user = userRecord.dataValues;

      Reflect.deleteProperty(user, "password");
      Reflect.deleteProperty(user, "access_token");

      return { user, token };
    } catch (err) {
      throw err;
    }
  }

  async login(info) {
    try {
      const searchUser = await this.User.findOne({
        where: { email: info.email },
      });
      if (!searchUser) throw new Error("User not registered");
      if (!(await searchUser.validPassword(info.password)))
        throw new Error("Invalid Password");

      const accessToken = await this.jwt.genAccessToken(searchUser.id);
      const refreshToken = await this.jwt.genRefreshToken(searchUser.id);

      await searchUser.update({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      const user = searchUser.dataValues;
      Reflect.deleteProperty(user, "password");
      Reflect.deleteProperty(user, "access_token");
      Reflect.deleteProperty(user, "refresh_token");

      return { user, accessToken, refreshToken };
    } catch (err) {
      throw err;
    }
  }

  // async genAccessToken(userId) {
  //   const payload = {
  //     id: userId,
  //     iat: Math.floor(Date.now() / 1000),
  //     exp: Math.floor(Date.now() / 1000) + 10,
  //   };
  //   const token = jwt.sign(payload, config.jwtAccessSecret);
  //   return token;
  // }

  // async genRefreshToken(userId) {
  //   const payload = {
  //     id: userId,
  //     iat: Math.floor(Date.now() / 1000),
  //     exp: Math.floor(Date.now() / 1000) + 10,
  //   };
  //   const token = jwt.sign(payload, config.jwtAccessSecret);
  //   return token;
  // }
}

module.exports = AuthService;
