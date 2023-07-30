const { Router } = require("express");
const {getAll, save, getMap} = require("../controllers/maps.controller")

const router = Router();

router.get("", getAll)
router.get("/:id", getMap)
router.post("", save)

module.exports = router