const { Router } = require("express");
const { debug } = require("../controllers/debug.controller");
const { getAll, get, create } = require("../controllers/ambushes.controller");

const router = Router();

router.get("", getAll);
router.get("/:id", get);
router.post("", create);

module.exports = router;
