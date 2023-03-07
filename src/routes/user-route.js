const express = require("express");
const router = express.Router();
const userController = require("../controller/user-controller");
const upload = require("../middlewares/upload");

router.get("/", userController.getAllUser);
router.get("/:userId", userController.getUserById);
router.get("/search/name", userController.getUserByUserName);
router.patch(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  userController.updateProfileUser,
);

module.exports = router;
