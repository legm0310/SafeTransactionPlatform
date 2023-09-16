const express = require("express");
const router = express.Router();
const utils = require("../utils");
const { chatController } = require("../controllers");

/** chat 관련 라우팅 함수
 * @param {Function} app 라우터 설정을 위한 express.Router()
 * @todo 유효성 검증 추가
 *
 */
module.exports = (app) => {
  app.use("/chat", router);

  router.get("/getMessagesTest", chatController.getMessagesTest);
  router.post("/createTest", chatController.createTest);
  router.post("/addMessage", chatController.addMessage);
  router.get("/:id", chatController.getRoom);
  router.post("/", chatController.addRoom);
  // router.get("/", chatController.getChats);
};
