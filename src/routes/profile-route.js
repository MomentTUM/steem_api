const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const profileController = require("../controller/profile-controller");

router.get("/", profileController.getProfile);

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  profileController.createProfile,
);
router.patch(
  "/:profileId",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  profileController.updateProfile,
);

module.exports = router;
