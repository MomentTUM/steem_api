const express = require("express");
const adminController = require("../controller/admin-controller");
const router = express.Router();

router.get("/games/:appId", adminController.getGameToData);
router.get("/games", adminController.getGamesToData);

module.exports = router;
