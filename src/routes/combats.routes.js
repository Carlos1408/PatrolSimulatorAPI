const { Router } = require("express");
const { getAll, get, create } = require("../controllers/combats.controller");
const { debug } = require("../controllers/debug.controller");
const { verifyToken } = require("../controllers/auth.controller");

const router = Router();

router.get("", getAll);
router.get("/:id", get);
router.post("", debug, create);

module.exports = router;
