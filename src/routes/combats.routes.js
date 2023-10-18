const { Router } = require("express");
const { getAll, get, create } = require("../controllers/combats.controller");
const { debug } = require("../controllers/debug.controller");
const { verifyToken } = require("../controllers/auth.controller");

const router = Router();

router.get("", verifyToken, getAll);
router.get("/:id", verifyToken, get);
router.post("", create);

module.exports = router;
