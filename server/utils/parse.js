const parseProducts = async (products) => {
  let parsedProducts = await products.map((value) => {
    value.dataValues.image = value.dataValues.images.split(",")[0];
    delete value.dataValues.images;
    return value.dataValues;
  });
  return parsedProducts;
};

module.exports = {
  parseProducts,
};
