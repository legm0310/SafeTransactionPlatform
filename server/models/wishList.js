const Sequelize = require("sequelize");

class WishList extends Sequelize.Model {
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
        modelName: "wish_list",
        freezeTableName: true,
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        underscored: true,
        sequelize,
      }
    );
  }
}

module.exports = WishList;
