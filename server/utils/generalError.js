const ApiError = require("./ApiError");

class BadRequestError extends ApiError {
  constructor(message) {
    super(400, "BadRequest", message);
    this.name = "BadRequest";
    this.message = message;
  }
}
class UnauthorizedError extends ApiError {
  constructor(message) {
    super(401, "Unauthorized", message);
    this.name = "Unauthorized";
    this.message = message;
  }
}
class ForbiddenError extends ApiError {
  constructor(message) {
    super(403, "Forbidden", message);
    this.name = "Forbidden";
    this.message = message;
  }
}
class NotFoundError extends ApiError {
  constructor(message) {
    super(404, "NotFound", message);
    this.name = "NotFound";
    this.message = message;
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
};
