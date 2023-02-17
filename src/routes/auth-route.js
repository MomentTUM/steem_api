const express = require("express")
const authController = require("../controller/auth-controller")

const router = express.Router()

router.post("/register", authController.register)
router.post("/login", authController.login)
router.delete("/:userId", authController.deleteUser)

module.exports = router