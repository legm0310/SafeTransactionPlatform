const Sequelize = require("sequelize");

class Catagory extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(255),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        modelName: "catagory",
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

  static associate(db) {}
}

module.exports = Catagory;
