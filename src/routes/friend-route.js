const express = require("express")
const friendController = require("../controller/friend-controller")
const router = express.Router()

router.post("/:userId",friendController.requestFriend)

module.exports = router