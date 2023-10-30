const { Container } = require("typedi");
const crypto = require("crypto");
const { ethers } = require("ethers");
const { Op } = require("sequelize");
const { sequelize } = require("../models");
const {
  BadRequestError,
  InternalServerError,
  generateGetProductsQuery,
  extractProductsList,
} = require("../utils");

class ProductService {
  constructor() {
    this.Product = Container.get("productModel");
    this.User = Container.get("userModel");
  }

  //해시로 제품 데이터 무결성 검사
  genProductHash(input) {
    const type = ["uint64", "uint256", "uint32", "address"];
    const hash = ethers.solidityPackedKeccak256(type, input);
    if (!hash) throw new BadRequestError("Failed to generate hash");
    return hash;
  }

  async addProduct(productData) {
    const txn = await sequelize.transaction();
    const { prodData, hashDataArr } = productData;
    try {
      const newProd = await this.Product.create(prodData, {
        transaction: txn,
      });

      const plain = [newProd.id, ...hashDataArr];
      const hash = this.genProductHash(plain);

      await this.Product.update(
        { hash: hash },
        {
          where: { id: newProd.id },
          transaction: txn,
        }
      );

      await txn.commit();
      return newProd;
    } catch (err) {
      console.log(err);
      await txn.rollback();
      throw err;
    }
  }

  //query에 따른 분기
  async getProductsAndCount(params) {
    const query = generateGetProductsQuery(params);
    const { count, rows } = await this.Product.findAndCountAll(query);
    const pages = Math.ceil(count / 12);

    const extractedList = extractProductsList(rows);
    return { pages, prodList: extractedList };
  }

  //infinite scrolling 방식 (lastId)
  async getProducts(params) {
    const query = generateGetProductsQuery(params);
    const products = await this.Product.findAll(query);
    if (!products) throw new InternalServerError("Internal Server Error");

    const extractedList = extractProductsList(products);
    if (params.search || params.category) {
      extractedList.count = await this.Product.count({
        where: {
          title: { [Op.like]: `%${params.search}%` },
          category: { [Op.like]: `${params.category}` },
        },
      });
    }
    return extractedList;
  }

  async getBatchProducts(params) {
    const prodIds = params;
    const products = await this.Product.findAll({
      where: {
        id: { [Op.in]: prodIds },
      },
      order: [
        ["created_at", "DESC"],
        ["id", "DESC"],
      ],
    });
    if (!products) throw new InternalServerError("Internal Server Error");

    const extractedList = extractProductsList(products);
    return extractedList;
  }

  async getProductById(data) {
    const { productId, userId } = data;

    const product = await this.Product.findByPk(+productId, {
      include: {
        model: this.User,
        attributes: ["user_name"],
      },
    });
    const productData = product.toJSON();
    productData.images = productData.images.split(",");

    const wishList = await product.getWishList({
      where: { id: userId },
      include: [],
      raw: true,
    });

    const hasWishList = (wishList || []).length > 0 ? true : false;
    productData.seller_name = productData.user?.user_name;
    productData.wishCount = wishList.length;
    productData.hasWishList = hasWishList;
    delete productData.user;
    return productData;
  }

  async updateProductStatus(data) {
    const { status, productId, txHash } = data;
    const updated = await this.Product.update(
      {
        status: status,
        ...(status == "RESERVED" && { deposit_tx: txHash }),
        ...(status == "SOLD" && { release_tx: txHash }),
        ...(!status && { approve_tx: txHash }),
      },
      { where: { id: productId } }
    );
    if (!updated) {
      throw new InternalServerError(updated);
    }
    return updated;
  }

  async updateProduct(attr, id) {
    const updated = await this.Product.update(
      { status: attr },
      { where: { id: id } }
    );
    return updated;
  }

  async deleteProduct(productData) {
    const result = await this.Product.destroy({
      where: {
        id: +productData.productId,
        seller_id: +productData.userId,
      },
    });
    return result;
  }
}

module.exports = ProductService;
