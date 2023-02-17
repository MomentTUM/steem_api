const express = require("express")
const router = express.Router()
const wishListController = require("../controller/wishList-controller")

router.post("/:gameId", wishListController.addWishList)

module.exports = router