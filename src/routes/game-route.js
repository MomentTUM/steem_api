const express = require("express");
const router = express.Router();
const gameController = require("../controller/game-controller");

router.get("/", gameController.getAllGame);
router.get("/name", gameController.getGameByName);

module.exports = router;
