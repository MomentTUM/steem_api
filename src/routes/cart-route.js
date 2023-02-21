const express = require("express")
const router = express.Router()
const cartController = require("../controller/cart-controller")

router.post("/:profileId/:gameId", cartController.addToCart)
router.delete("")

module.exports = router