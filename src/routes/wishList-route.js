const express = require("express");
const router = express.Router();
const wishListController = require("../controller/wishList-controller");

router.post("/:steamAppId", wishListController.addWishList);
router.delete("/:wishlistId", wishListController.deleteWishList);
router.get("/", wishListController.getWishlist);

module.exports = router;
