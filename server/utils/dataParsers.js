const { Op } = require("sequelize");

const genCondition = (params) => {
  for (const key in params) {
    if (params.hasOwnProperty(key) && Array.isArray(params[key])) {
      const where = {
        id: {
          [Op.in]: params[key],
        },
      };
      return { where };
    }
  }

  if (Array.isArray(params)) {
    const where = {
      id: {
        [Op.in]: params,
      },
    };
    return { where };
  }
  const { lastId, search, status, page, sellerId, category } = params;
  const limit = 12;
  const offset = +page && +page > 1 ? 0 + (page - 1) * limit : null;

  const where = {
    ...(lastId && { id: { [Op.lt]: lastId } }),
    ...(search && { title: { [Op.like]: `%${search}%` } }),
    ...(status && { status }),
    ...(sellerId && { seller_id: sellerId }),
    ...(category && { category: { [Op.like]: `${category}` } }),
  };
  return { where, offset, limit };
};

const generateGetProductsQuery = (params) => {
  const { where, offset, limit } = genCondition(params);
  let query = {
    where: where,
    order: [
      ["created_at", "DESC"],
      ["id", "DESC"],
    ],
    offset: offset,
    limit: limit,
    attributes: [
      "id",
      "status",
      "title",
      "price",
      "category",
      "images",
      "created_at",
      "seller_id",
      "seller_wallet",
      "deposit_tx",
      "approve_tx",
      "release_tx",
    ],
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
