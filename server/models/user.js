const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

//db userTable model
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
        role: {
          type: Sequelize.TINYINT,
          allowNull: false,
        },
        user_name: {
          type: Sequelize.STRING(45),
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
          type: Sequelize.STRING(45),
          allowNull: false,
          unique: true,
        },
        wallet_address: {
          type: Sequelize.STRING(170),
          allowNull: true,
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
      foreignKey: {
        name: "user_id",
        unique: true,
      },
      sourceKey: "id",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    db.User.hasMany(db.Product, {
      foreignKey: {
        name: "seller_id",
        unique: false,
        allowNull: false,
      },
      sourceKey: "id",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    db.User.hasMany(db.WishList, {
      foreignKey: {
        name: "user_id",
        unique: false,
        allowNull: false,
      },
      sourceKey: "id",
      onDelete: "cascade",
    });
    // db.User.belongsToMany(db.ChatRoom. {
    //   foreignKey: {
    //     name:,

    //   }
    // })
  }
}
module.exports = User;
