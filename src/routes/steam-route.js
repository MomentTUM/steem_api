const express = require("express");
const router = express.Router();
const steamController = require("../controller/steam-controller");
const likeController = require("../controller/like-controller");

router.get("/games/:appId", steamController.getGameInfo);
router.get("/games", steamController.getGamesInfo);
router.get("/games/getapplist", steamController.getAppList);
router.post("/games/:userId/:gameId", likeController.createLike);
router.delete("/games/:userId/:gameId", likeController.unlike);

module.exports = router;
