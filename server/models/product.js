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
        seller_wallet: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        hash: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        deposit_txid: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        release_txid: {
          type: Sequelize.STRING,
          allowNull: true,
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

    // 1 : N
    db.Product.belongsTo(db.User, {
      foreignKey: { name: "seller_id", allowNull: false },
      onDelete: "cascade",
    });

    // N : M
    db.Product.belongsToMany(db.User, {
      through: "wish_list",
      as: "WishList",
      foreignKey: "product_id",
      onDelete: "cascade",
    });
  }
}

module.exports = Product;
