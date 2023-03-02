const express = require("express");
const router = express.Router();
const userController = require("../controller/user-controller");
const upload = require("../middlewares/upload");

router.get("/", userController.getAllUser);
router.get("/:userId", userController.getUserById);

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  userController.createProfile,
);

router.patch(
  "/:userId",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  userController.updateProfile,
);

module.exports = router;
