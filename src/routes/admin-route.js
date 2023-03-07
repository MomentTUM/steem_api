const express = require("express");
const adminController = require("../controller/admin-controller");
const router = express.Router();

//add game to database
router.get("/games/all", adminController.getGamesToData);
router.get("/games/:appId", adminController.getGameToData);

module.exports = router;
