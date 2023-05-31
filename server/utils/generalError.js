const ApiError = require("./ApiError");
const httpStatus = require("http-status");

class BadRequestError extends ApiError {
  constructor(message) {
    super(httpStatus.BAD_REQUEST, "BadRequest", message);
    this.name = "BadRequest";
    this.message = message;
  }
}
class UnauthorizedError extends ApiError {
  constructor(message) {
    super(httpStatus.UNAUTHORIZED, "Unauthorized", message);
    this.name = "Unauthorized";
    this.message = message;
  }
}
class ForbiddenError extends ApiError {
  constructor(message) {
    super(httpStatus.FORBIDDEN, "Forbidden", message);
    this.name = "Forbidden";
    this.message = message;
  }
}
class NotFoundError extends ApiError {
  constructor(message) {
    super(httpStatus.NOT_FOUND, "NotFound", message);
    this.name = "NotFound";
    this.message = message;
  }
}
class InternalServerError extends ApiError {
  constructor(message) {
    super(httpStatus.INTERNAL_SERVER_ERROR, "InternalServerError", message);
    this.name = "InternalServerError";
    this.message = message;
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  InternalServerError,
};
