const { Router } = require("express");
const {
  getAll,
  getRecognition,
  save,
  saveRecognition,
} = require("../controllers/recognitions.controller");
const { debug } = require("../controllers/debug.controller");

const router = Router();

router.get("", getAll);
router.get("/:id", getRecognition);
router.post("", debug, save);
router.post("/patrol/:patrolId", saveRecognition);

module.exports = router;
