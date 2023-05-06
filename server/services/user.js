const { Container } = require("typedi");

class UserService {
  constructor() {
    this.User = Container.get("userModel");
  }

  async createUser(newUserBody) {
    if (await this.User.getUserByPhoneNumber(newUserBody.phone_number)) {
      throw new Error("User already exist");
    }
    return await this.User.create(newUserBody);
  }

  async getUserById(id) {
    return await this.User.findByPk(id);
  }
  async getUserByEmail(email) {
    return await this.User.findOne({
      where: {
        email: email,
      },
    });
  }
  async updateUserById(userId, updateBody) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
  }

  async deleteUserById(userId) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return await this.User.destroy({
      where: {
        id: userId,
      },
    });
  }
}

module.exports = UserService;
