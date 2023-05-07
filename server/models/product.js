const Sequelize = require("sequelize");

//db productTable model
class Product extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        status: {
          type: Sequelize.ENUM("SALE", "RESERVED", "COMPLETE"),
          allowNull: true,
        },
        title: {
          type: Sequelize.STRING(90),
          allowNull: false,
        },
        category: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        detail: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        seller_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        modelName: "product", // This is the name of the table in the database
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Product.belongsTo(db.User, {
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

module.exports = Product;
