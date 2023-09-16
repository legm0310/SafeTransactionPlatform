const express = require("express");
const router = express.Router();
const { isAuth, uploader } = require("../middlewares");
const utils = require("../utils");
const { productController } = require("../controllers");

/** product 관련 라우팅 함수
 * @param {Function} app 라우터 설정을 위한 express.Router()
 * @todo 유효성 검증 추가
 *
 */
module.exports = (app) => {
  app.use("/products", router);

  //제품등록, 구매 진행중인 제품 가져오기
  router.post("/", isAuth, uploader, productController.addProduct);
  router.post("/deposited", productController.getDepositedProducts);

  // 제품 리스트(검색 등), 최근상품 가져오기
  router.get("/", productController.getProducts);
  router.get("/recent", productController.getRecentProducts);

  // 상세, 업데이트, 제품 구매(금액예치, 확정), 제품 삭제
  router.get("/:id", productController.getProduct);
  router.put("/:id", productController.updateProduct);
  router.put("/deposit/:id", productController.deposit);
  router.put("/release/:id", productController.release);
  router.delete("/:id", productController.deleteProduct);

  // 제품 찜 가져오기, 등록, 삭제
  // router.get("/wishlist/:id", productController.getWishList);
  router.post("/wishlist", productController.addWishList);
};
