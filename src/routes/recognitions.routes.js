const { Router } = require("express");
const {
  getAll,
  getRecognition,
  save,
  saveRecognition,
} = require("../controllers/recognitions.controller");

const router = Router();

router.get("", getAll);
router.get("/:id", getRecognition);
router.post("", save);
router.post("/patrol/:patrolId", saveRecognition);

module.exports = router;
