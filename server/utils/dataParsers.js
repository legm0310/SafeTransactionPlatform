const { Op } = require("sequelize");

const generateCondition = (params) => {
  const { lastId, search, status, page, sellerId } = params;
  const limit = 12;
  const offset = +page && +page > 1 ? 0 + (page - 1) * limit : null;

  const where = {
    ...(lastId && { id: { [Op.lt]: lastId } }),
    ...(search && { title: { [Op.like]: `%${search}%` } }),
    ...(status && { status }),
    ...(sellerId && { sellerId }),
  };
  return { where, offset, limit };
};

const generateGetProductsQuery = (params) => {
  const { where, offset, limit } = generateCondition(params);

  let query = {
    where: where,
    order: [
      ["created_at", "DESC"],
      ["id", "DESC"],
    ],
    offset: offset,
    limit: limit,
    attributes: ["id", "title", "price", "images", "created_at"],
  };
  return query;
};

const extractProductsList = (products) => {
  const productsFromDb = products.rows ?? products;

  let parsedProducts = productsFromDb.map((value) => {
    value.dataValues.image = value.dataValues.images.split(",")[0];
    delete value.dataValues.images;
    return value.dataValues;
  });
  return parsedProducts;
};

module.exports = {
  generateGetProductsQuery,
  extractProductsList,
};
