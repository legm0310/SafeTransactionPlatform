const UserService = require("./user");
const AuthService = require("./auth");
const TokenService = require("./token");
const ProductService = require("./product");
const ChatService = require("./chat");

module.exports = {
  userService: UserService,
  tokenService: TokenService,
  authService: AuthService,
  productService: ProductService,
  chatService: ChatService,
};
