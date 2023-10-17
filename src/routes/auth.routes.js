const { Router } = require("express");
const {login, signInUsingToken} = require("../controllers/auth.controller.js")

const router = Router();

router.post("/login", login)
router.post("/sign-up-by-token", signInUsingToken)

module.exports = router
