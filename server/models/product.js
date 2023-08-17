const Sequelize = require("sequelize");

class Product extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        status: {
          type: Sequelize.ENUM("SALE", "RESERVED", "SOLD"),
          allowNull: true,
        },
        title: {
          type: Sequelize.STRING(255),
          unique: true,
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        category: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        detail: {
          type: Sequelize.STRING(1000),
          allowNull: false,
        },
        images: {
          type: Sequelize.STRING(3000),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "product", // This is the name of the table in the database
        freezeTableName: true,
        timestamps: true,
        underscored: true,

        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    // 정규화 시 이미지 테이블 분리
    // db.Product.hasMany(db.ProductImage, {
    //   foreignKey: {
    //     name: "prod_id",
    //     allowNull: false,
    //   },
    //   targetKey: "id",
    //   onDelete: "cascade",
    //   onUpdate: "cascade",
    // });
    db.Product.hasMany(db.WishList, {
      foreignKey: {
        name: "product_id",
        unique: false,
        allowNull: false,
      },
      sourceKey: "id",
      onDelete: "cascade",
    });
    db.Product.belongsTo(db.User, {
      foreignKey: {
        name: "seller_id",
        unique: false,
        allowNull: false,
      },
      targetKey: "id",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  }
}

module.exports = Product;
