const express = require("express");
const authController = require("../controller/auth-controller");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/me", authenticate, authController.getMe);
router.post("/register", authController.register);
router.post("/checkemail", authController.checkEmail)
router.post("/login", authController.login);
router.delete("/:userId", authController.deleteUser);

module.exports = router;
