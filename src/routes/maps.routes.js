const { Router } = require("express");
const {getAll, getByMapKey, save} = require("../controllers/maps.controller")

const router = Router();

router.get("", getAll)
router.get("/:mapKey", getByMapKey)
router.post("", save)

module.exports = router