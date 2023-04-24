const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const sequelize = require("../config/database");
const Sequelize = require("sequelize");

const User = sequelize.define(
  "user",
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
      allowNull: true,
    },
    user_name: {
      type: Sequelize.STRING(127),
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
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: "user", // This is the name of the table in the database
    timestamps: false, // This will add createdAt and updatedAt fields
  }
);
// async () => await User.sync({});
// (async () => {
//   await sequelize.sync();
//   console.log("User table created or updated");

//   const newUser = await User.create({
//     wallet_address: "0x1234567890abcdef",
//     role: 1,
//     user_name: "John Doe",
//     email: "john.doe@example.com",
//     password: "secret",
//     phone_number: "123-456-7890",
//   });

//   console.log("New user created:", newUser.toJSON());
// })();

module.exports = User;
