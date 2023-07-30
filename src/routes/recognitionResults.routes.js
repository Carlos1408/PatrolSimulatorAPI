const { Router } = require("express");
const {
  getAll,
  save,
  saveResult,
  getResult,
} = require("../controllers/recognitionResults.controller");

const router = Router();

router.get("", getAll);
router.get("/:id", getResult);
router.post("", save);
router.post("/patrol/:patrolId", saveResult);

module.exports = router;
