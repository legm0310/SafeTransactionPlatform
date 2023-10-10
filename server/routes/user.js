const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");
const { isAuth } = require("../middlewares");
/** user 관련 라우팅 함수
 * @param {Function} app 라우터 설정을 위한 express.Router()
 * @todo 유효성 검증 추가
 *
 */
module.exports = (app) => {
  app.use("/user", router);

  // 제품 찜 가져오기, 등록, 삭제

  router.get("/wishlist/:id", isAuth, userController.getWishList);
  router.post("/wishlist", isAuth, userController.addWishList);
  router.delete("/wishlist/:id", isAuth, userController.deleteWishList);

  // 유저 닉네임, 소개 수정
  router.put("/userName/:id", userController.updateUserName);
  router.put("/introduce/:id", userController.updateIntroduce);

  router.get("/:id", userController.getUser);
};
