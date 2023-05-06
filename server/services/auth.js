const { Container } = require("typedi");

class AuthService {
  constructor() {
    this.userService = Container.get("userService");
    this.jwt = Container.get("tokenService");
  }

  async signup(newUser) {
    // console.log(this.User);
    try {
      // const searchUser = await this.User.getUserByPhoneNumber(
      //   newUser.phone_number
      // );
      // if (searchUser) throw new Error("Exist user");

      const userRecord = await this.userService.createUser(newUser);

      if (!userRecord) throw new Error("User cannot be created");

      const { access, refresh } = await this.jwt.genAuthToken(userRecord.id);

      const user = userRecord.dataValues;
      Reflect.deleteProperty(user, "password");

      return { user, accessToken: access.token, refreshToken: refresh.token };
    } catch (err) {
      throw err;
    }
  }

  async login(info) {
    try {
      const searchUser = await this.userService.getUserByEmail(info.email);
      if (!searchUser) throw new Error("User not registered");

      if (!(await searchUser.validPassword(info.password)))
        throw new Error("Invalid Password");

      const { access, refresh } = await this.jwt.genAuthToken(searchUser);

      const user = searchUser.dataValues;
      Reflect.deleteProperty(user, "password");

      return { user, accessToken: access.token, refreshToken: refresh.token };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = AuthService;
