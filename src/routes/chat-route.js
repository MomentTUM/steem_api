const express = require("express");
const chatController = require("../controller/chat-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post(
  "/:senderId/:receiverId",
  upload.single("messageImage"),
  chatController.createChat,
);

module.exports = router;
