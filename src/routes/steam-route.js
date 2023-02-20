const express = require("express");
const router = express.Router();
const steamController = require("../controller/steam-controller");

router.get("/games/:appId", steamController.getGameInfo);
router.get("/games", steamController.getGamesInfo);
router.get("/games/getapplist", steamController.getAppList);

module.exports = router;
