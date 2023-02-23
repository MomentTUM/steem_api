const express = require("express");
const friendController = require("../controller/friend-controller");
const router = express.Router();

router.post("/:userId", friendController.requestFriend);
router.patch("/:requesterId", friendController.acceptFriend);
router.get("/friends", friendController.findFriend);
router.delete("/:friendId", friendController.deleteFriend);

module.exports = router;
