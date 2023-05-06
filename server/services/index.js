const UserService = require("./user");
const AuthService = require("./auth");
const TokenService = require("./token");
const ProductService = require("./product");

module.exports = {
  userService: UserService,
  tokenService: TokenService,
  authService: AuthService,
};
