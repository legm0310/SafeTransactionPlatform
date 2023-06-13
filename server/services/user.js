const { Container } = require("typedi");
const { BadRequestError, NotFoundError } = require("../utils/generalError");

class UserService {
  constructor() {
    this.User = Container.get("userModel");
  }

  async createUser(newUserBody) {
    if (await this.User.getUserByPhoneNumber(newUserBody.phone_number)) {
      throw new BadRequestError("Phone number already exists");
    }
    if (await this.getUserByEmail(newUserBody.email)) {
      throw new BadRequestError("Email already exists");
    }

    return await this.User.create(newUserBody);
  }

  async getUserById(id) {
    const user = await this.User.findByPk(id);
    return user;
  }

  async getUserByEmail(email) {
    const user = await this.User.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }

  async updateUserById(userId, updateBody) {
    const user = await this.getUserById(userId);
    if (!user) throw new NotFoundError("User not found");
  }

  async deleteUserById(userId) {
    const user = await this.getUserById(userId);
    if (!user) throw new NotFoundError("User not found");
    return await this.User.destroy({
      where: {
        id: userId,
      },
      force: true,
    });
  }
}

module.exports = UserService;
