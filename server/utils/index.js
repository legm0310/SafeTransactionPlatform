const ApiError = require("./ApiError");
const catchAsync = require("./catchAsync");
const generalError = require("./generalError");
const s3Upload = require("./s3Upload");

module.exports = {
  ApiError,
  catchAsync,
  BadRequestError: generalError.BadRequestError,
  UnauthorizedError: generalError.UnauthorizedError,
  ForbiddenError: generalError.ForbiddenError,
  NotFoundError: generalError.NotFoundError,
  uploadProdImg: s3Upload.uploadProductImg,
  deleteProdImg: s3Upload.deleteProductImg,
};
