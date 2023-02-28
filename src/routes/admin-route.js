const express = require("express");
const adminController = require("../controller/admin-controller");
const router = express.Router();

router.get("/games/:appId", adminController.getGameToData);

module.exports = router;
