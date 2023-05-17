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
        modelName: "token", // This is the name of the table in the database
        freezeTableName: true,
        timestamps: true,
        createAt: false,
        updatedAt: false,
        underscored: true,
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Token.belongsTo(db.User, {
      foreignKey: {
        name: "user_id",
        unique: true,
      },
      sourceKey: "id",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  }
}

module.exports = Token;
