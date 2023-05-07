const { Container } = require("typedi");

class AuthService {
  constructor() {
    this.userService = Container.get("userService");
    this.jwt = Container.get("tokenService");
  }

  /** 회원가입 메소드
   * @description 회원가입 로직
   * @param {object} newUser - db에 저장할 사용자 데이터, req.body
   * @param {string} newUser.role - 사용자 권한
   * @param {string} newUser.user_name - 사용자 이름
   * @param {string} newUser.email - 사용자 이메일
   * @param {string} newUser.password - 사용자 패스워드
   * @param {string} newUser.phone_number - 사용자 전화번호
   * @returns {{user: object, accessToken: string, refreshToken: string}} 생성한 user, token
   */
  async signup(newUser) {
    try {
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

  /** 로그인 메소드
   * @description 로그인 로직
   * @param {object} info - 사용자 정보, email/password, req.body
   * @param {string} info.email - 사용자 이메일
   * @param {string} info.password - 사용자 패스워드
   * @returns {{user: object, accessToken: string, refreshToken: string}}
   */
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

  async logout(refreshToken) {
    try {
      return await this.jwt.removeToken(refreshToken);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = AuthService;
