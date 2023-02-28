const express = require("express");
const router = express.Router();
const cartController = require("../controller/cart-controller");

router.get("/", cartController.getCart);
router.post("/:steamAppId", cartController.setCart);
router.delete("/:steamAppId", cartController.deleteCart);

router.post("/:profileId/:gameId", cartController.addToCart);
module.exports = router;
