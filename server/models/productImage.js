// TODO

//const Sequelize = require("sequelize");

// class ProductImage extends Sequelize.Model {
//   static init(sequelize) {
//     super.init(
//       {
//         image_url: {
//           type: Sequelize.STRING(),
//           allowNull: false,
//         },
//       },
//       {
//         modelName: "product_image",
//         freezeTableName: true,
//         timestamps: true,
//         underscored: true,
//         sequelize,
//       }
//     );
//   }

//   static associate(db) {
//     db.ProductImage.belongsTo(db.Product, {
//       foreignKey: {
//         name: "prod_id",
//         allowNull: false,
//       },
//       sourceKey: "id",
//       onDelete: "cascade",
//       onUpdate: "cascade",
//     });
//   }
// }

// module.exports = ProductImage;
