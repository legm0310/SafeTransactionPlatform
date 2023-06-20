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

const generateClearCondition = (parmas) => {
  const where = {
    id: {
      [Op.in]: parmas,
    },
  };
  return { where };
};

const generateGetProductsQuery = (params) => {
  let queryWhere, queryOffset, queryLimit;
  generateCondition(params);
  if (Array.isArray(params)) {
    const { where } = generateClearCondition(params);
    queryWhere = where;
  } else {
    const { where, offset, limit } = generateCondition(params);
    queryWhere = where;
    queryOffset = offset;
    queryLimit = limit;
  }

  let query = {
    where: queryWhere,
    order: [
      ["created_at", "DESC"],
      ["id", "DESC"],
    ],
    offset: queryOffset,
    limit: queryLimit,
    attributes: ["id", "status", "title", "price", "images", "created_at"],
  };
  return query;
};

const generatePurchasedProductsQuery = (parmas) => {
  generateClearCondition(parmas);
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
  generatePurchasedProductsQuery,
};
