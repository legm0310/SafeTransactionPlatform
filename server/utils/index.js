const catchAsync = require("./catchAsync");
const generalError = require("./generalError");
const parse = require("./parse");

const s3Upload = require("./s3Upload");

module.exports = {
  catchAsync,
  ApiError: generalError.ApiError,
  BadRequestError: generalError.BadRequestError,
  UnauthorizedError: generalError.UnauthorizedError,
  ForbiddenError: generalError.ForbiddenError,
  NotFoundError: generalError.NotFoundError,
  InternelServerError: generalError.InternalServerError,
  uploadProdImg: s3Upload.uploadProductImg,
  deleteProdImg: s3Upload.deleteProductImg,
  getImgUrlByKey: s3Upload.getImgUrlByKey,
  parseProducts: parse.parseProducts,
  getProductsQueryConvert: parse.getProductsQueryConvert,
};
