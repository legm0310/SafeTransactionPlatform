const { Container } = require("typedi");
const { UnauthorizedError, NotFoundError } = require("../utils/generalError");

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
   * @returns {{user: object}} 생성한 user
   */
  async signup(newUser) {
    const userRecord = await this.userService.createUser(newUser);
    if (!userRecord) throw new Error("User cannot be created");
    const user = userRecord.dataValues;
    Reflect.deleteProperty(user, "password");

    return user;
  }

  /** 로그인 메소드
   * @description 로그인 로직
   * @param {object} info - 사용자 정보, email/password, req.body
   * @param {string} info.email - 사용자 이메일
   * @param {string} info.password - 사용자 패스워드
   * @returns {{user: object, accessToken: string, refreshToken: string}}
   */
  async login(info) {
    const searchUser = await this.userService.getUserByEmail(info.email);
    if (!searchUser) throw new NotFoundError("User not found");
    if (!(await searchUser.validPassword(info.password)))
      throw new UnauthorizedError("Invalid Password");

    const { access, refresh } = await this.jwt.genAuthToken(searchUser);

    const user = searchUser.dataValues;
    Reflect.deleteProperty(user, "password");

    return { user, accessToken: access.token, refreshToken: refresh.token };
  }

  async logout(refreshToken) {
    const refreshTokenRecord = await this.jwt.getToken(refreshToken);
    if (refreshTokenRecord) return await this.jwt.removeToken(refreshToken);
    return;
  }

  async check(userId) {
    const userData = await this.userService.getUserById(userId);
    if (!userData) throw new UnauthorizedError("Please authenticate");
    const user = userData.dataValues;
    Reflect.deleteProperty(user, "password");
    return user;
  }
}

module.exports = AuthService;
