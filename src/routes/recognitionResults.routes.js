const { Router } = require("express");
const {
  getAll,
  save,
  saveResult,
  getResult,
} = require("../controllers/recognitionResults.controller");
const { debug } = require("../controllers/debug.controller");

const router = Router();

router.get("", getAll);
router.get("/:id", getResult);
router.post("", debug, save);
router.post("/patrol/:patrolId", saveResult);

module.exports = router;
