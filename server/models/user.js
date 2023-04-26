const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config("../");

//모델 인스턴스 --> 클래스로 마이그레이션 해야함

class User extends Sequelize.Model {
  async validPassword(plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
  }

  async genToken() {
    const payload = {
      id: this.id,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
    return await this.update({ access_token: token }).catch((err) => {
      return err;
    });
  }

  //정적 메서드를 인스턴스 없이(클래스를 실행하지 않고 )사용하면 this가 없다.
  //아래 메서드는 인스턴스에서 사용하면 인스턴스가 this가 된다.
  static getUserByPhoneNumber = async (phoneNumber) => {
    return await User.findOne({
      where: {
        phone_number: phoneNumber,
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
        // created_at: {
        //   type: Sequelize.DATE,
        //   defaultValue: Sequelize.NOW,
        //   allowNull: false,
        // },
        // updated_at: {
        //   type: Sequelize.DATE,
        //   defaultValue: Sequelize.NOW,
        //   allowNull: false,
        // },
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
