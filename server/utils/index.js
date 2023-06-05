const ApiError = require("./ApiError");
const catchAsync = require("./catchAsync");
const generalError = require("./generalError");
const parse = require("./parse");

const s3Upload = require("./s3Upload");

module.exports = {
  ApiError,
  catchAsync,
  BadRequestError: generalError.BadRequestError,
  UnauthorizedError: generalError.UnauthorizedError,
  ForbiddenError: generalError.ForbiddenError,
  NotFoundError: generalError.NotFoundError,
  InternelServerError: generalError.InternalServerError,
  uploadProdImg: s3Upload.uploadProductImg,
  parseProducts: parse.parseProducts,
  deleteProdImg: s3Upload.deleteProductImg,
  getImgUrlByKey: s3Upload.getImgUrlByKey,
};
