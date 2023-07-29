const { Router } = require("express");
const {auth, signInUsingToken} = require("../controllers/auth.controller.js")

const router = Router();

router.post("", auth)
router.post("sign-up", signInUsingToken)

module.exports = router
