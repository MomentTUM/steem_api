const express = require("express");
const router = express.Router();
const gameController = require("../controller/game-controller");

router.get("/", gameController.getAllGame);
// router.get("/name/:steamAppid", gameController.getGameByName);
router.get("/:steamAppid", gameController.getGame);

module.exports = router;
