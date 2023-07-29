const { Router } = require("express");
const {
  getAll,
  getRecognitionByKey,
  save,
  saveRecognition,
} = require("../controllers/recognitions.controller");

const router = Router();

router.get("", getAll);
router.get("/:recognitionKey", getRecognitionByKey);
router.post("", save);
router.post("/patrol/:patrolKey", saveRecognition);

module.exports = router;
