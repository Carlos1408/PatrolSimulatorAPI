const { Router } = require("express");
const {login, signInUsingToken} = require("../controllers/auth.controller.js")

const router = Router();

router.post("/login", login)
router.post("sign-up", signInUsingToken)

module.exports = router
