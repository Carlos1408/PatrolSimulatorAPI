const { debug } = require("../controllers/debug.controller");

const { Router } = require("express");
const {
  getAll,
  save,
  getMap,
  getMapByName,
  update,
} = require("../controllers/maps.controller");

const router = Router();

router.get("", getAll);
router.get("/:id", getMap);
router.get("/name/:name", getMapByName);
router.post("", save);
router.put("/:id", update);

module.exports = router;
