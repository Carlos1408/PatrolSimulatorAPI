const { Router } = require("express");
const {
  getAll,
  getRecognition,
  save,
  saveRecognition,
} = require("../controllers/recognitions.controller");
const { debug } = require("../controllers/debug.controller");
const { verifyToken } = require("../controllers/auth.controller");

const router = Router();

router.get("", verifyToken, getAll);
router.get("/:id", verifyToken, getRecognition);
router.post("", debug, save);
router.post("/patrol/:patrolId", saveRecognition);

module.exports = router;
