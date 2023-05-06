const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Sequelize.Model {
  async validPassword(plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
  }

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
      },
      {
        hooks: {
          beforeCreate: async (user, options) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          },
        },
        modelName: "user", // This is the name of the table in the database
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        sequelize,
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Token, {
      foreignKey: "user_id",
      sourceKey: "id",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  }
}
module.exports = User;
