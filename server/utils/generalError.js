const httpStatus = require("http-status");

class ApiError extends Error {
  constructor(statusCode, name, message, isOperational = true, stack = "") {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

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
  ApiError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  InternalServerError,
};
