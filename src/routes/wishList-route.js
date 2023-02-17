const express = require("express")
const router = express.Router()
const wishListController = require("../controller/wishList-controller")

router.post("/:profileId/:gameId", wishListController.addWishList)
router.delete("/:wishlistId/:profileId", wishListController.deleteWishList)

module.exports = router