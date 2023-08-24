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
          allowNull: false,
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
        sequelize,
        modelName: "user", // This is the name of the table in the database
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  //관계 설정 수정해야함 workbench 참조
  static associate(db) {
    // 1 : N (다른 브라우저 로그인 상황 고려)
    db.User.hasMany(db.Token, {
      // onDelete: "cascade",
    });
    // 1 : N (디폴트 설정 적용 시 외래키 명시하지 않아도됨)
    db.User.hasMany(db.ChatLog, {
      // onDelete: "cascade",
    });
    // 1 : N
    db.User.hasMany(db.Product, {
      foreignKey: "seller_id",
      // foreignKey: {
      //   name: "seller_id",
      //   unique: false,
      //   allowNull: false,
      // },

      // onDelete: "cascade",
    });

    // belongsToMany로 대체
    // db.User.hasMany(db.WishList, {
    //   foreignKey: {
    //     name: "user_id",
    //     unique: false,
    //     allowNull: false,
    //   },
    //   sourceKey: "id",
    //   onDelete: "cascade",
    // });

    // N : M
    db.User.belongsToMany(db.Product, {
      through: "wish_list",
      as: "WishList",
      foreignKey: "user_Id",
      onDelete: "cascade",
    });

    // N : M
    db.User.belongsToMany(db.ChatRoom, {
      through: "chat_participant",
      as: "ChatParticipant",
      foreignKey: "user_Id",
      onDelete: "cascade",
    });
  }
}
module.exports = User;
