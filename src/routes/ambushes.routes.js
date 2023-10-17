const { Router } = require("express");
const { debug } = require("../controllers/debug.controller");
const { getAll, get, create } = require("../controllers/ambushes.controller");
const { verifyToken } = require("../controllers/auth.controller");

const router = Router();

router.get("", getAll);
router.get("/:id", get);
router.post("", debug, create);

module.exports = router;
