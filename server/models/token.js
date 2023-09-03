const Sequelize = require("sequelize");

//db tokenTable model
class Token extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        access_version: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        refresh_token: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        reissue_timeout: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "token", // This is the name of the table in the database
        freezeTableName: true,
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        underscored: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    // 1 : N (다른 브라우저 로그인 상황 고려)
    db.Token.belongsTo(db.User, {
      foreignKey: { name: "user_id", unique: true, allowNull: false },
      onDelete: "cascade",
    });
  }
}

module.exports = Token;
