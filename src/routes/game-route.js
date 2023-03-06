const express = require("express");
const router = express.Router();
const gameController = require("../controller/game-controller");

router.get("/", gameController.getAllGame);
router.get("/name", gameController.getGameByName);
router.get("/add/all", gameController.getGamesToData);
router.get("/add/:appId", gameController.getGameToData);

module.exports = router;
