const { Router } = require("express");
const {
  getAll,
  getResultByKey,
  save,
  saveResult,
} = require("../controllers/recognitionResults.controller");

const router = Router();

router.get("", getAll);
router.get("/:resultKey", getResultByKey);
router.post("", save);
router.post("/patrol/:patrolKey", saveResult);

module.exports = router;
