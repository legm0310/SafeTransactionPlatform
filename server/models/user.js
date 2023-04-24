const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//모델 인스턴스 --> 클래스로 마이그레이션 해야함
const User = (Sequelize, DataTypes) => {
  const model = Sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      wallet_address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      role: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      tableName: "user", // This is the name of the table in the database
      timestamps: false,
      hooks: {
        // beforeCreate: async (user, options) => {
        //   console.log(user);
        //   const salt = await bcrypt.genSalt(10);
        //   user.password = await bcrypt.hash(user.password, salt);
        // },
        beforeUpdate: () => {},
      }, // This will add createdAt and updatedAt fields
    }
  );

  model.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  model.prototype.validPassword = async (plainPassword, password) => {
    console.log(this);
    return await bcrypt.compare(plainPassword, password);
  };

  model.getUserByPhoneNumber = async (phoneNumber) => {
    return await model.findOne({
      where: {
        phone_number: phoneNumber,
      },
    });
  };

  return model;
};

module.exports = User;
