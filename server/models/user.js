const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Sequelize.Model {
  async validPassword(plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
  }

  //정적 메서드를 인스턴스 없이(클래스를 실행하지 않고)사용하면 this가 없다.
  //아래 메서드는 인스턴스에서 사용하면 인스턴스가 this가 된다.
  static getUserByPhoneNumber = async (phoneNumber) => {
    return await User.findOne({
      where: {
        phone_number: phoneNumber,
      },
    });
  };

  static getUserByToken = async (refresh_token) => {
    return await User.findOne({
      where: {
        refresh_token: refresh_token,
      },
    });
  };

  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        wallet_address: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        role: {
          type: Sequelize.TINYINT,
          allowNull: false,
        },
        user_name: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(255),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        phone_number: {
          type: Sequelize.STRING(255),
          allowNull: false,
          unique: true,
        },
        access_token: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        refresh_token: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
      },
      {
        hooks: {
          beforeCreate: async (user, options) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          },
          beforeUpdate: () => {},
        },
        modelName: "user", // This is the name of the table in the database
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        sequelize,
      }
    );
  }
}
module.exports = User;
