const Sequelize = require("sequelize");
const config = require("../config");
const { ApiError } = require("../utils");
const httpStatus = require("http-status");

const errorConvert = (e, req, res, next) => {
  let error = e;
  console.log(error.constructor);

  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof Sequelize.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const name = error.name;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, name, message, false, e.stack);
  }

  next(error);
};

const globalErrorHandler = (e, req, res, next) => {
  let { statusCode, name, message } = e;
  const response = {
    code: statusCode,
    error: name,
    message,
    ...(config.nodeEnv && { stack: e.stack }),
  };

  console.log(response);
  if (response.stack) {
    Reflect.deleteProperty(response, "stack");
  }

  res.status(statusCode).json(response);
};

module.exports = { errorConvert, globalErrorHandler };
