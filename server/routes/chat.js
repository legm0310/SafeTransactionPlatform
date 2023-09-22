const express = require("express");
const router = express.Router();
const utils = require("../utils");
const { chatController } = require("../controllers");
const { isAuth } = require("../middlewares");
isAuth;
/** chat 관련 라우팅 함수
 * @param {Function} app 라우터 설정을 위한 express.Router()
 * @todo 유효성 검증 추가
 *
 */
module.exports = (app) => {
  app.use("/chat", router);

  router.get("/getMessagesTest", chatController.getMessagesTest);
  router.post("/createTest", chatController.createTest);
  router.delete("/deleteTest", chatController.deleteRoom);

  router.get("/", isAuth, chatController.getRooms);
  router.get("/:id", chatController.getChats);
  router.post("/room", isAuth, chatController.addRoom);
  router.delete("/:id", isAuth, chatController.deleteRoom);

  // router.post("/addMessage", chatController.addMessage);
  // router.delete("");
  // router.get("/", chatController.getChats);
};
