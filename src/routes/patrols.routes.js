const { Router } = require("express");
const {
  getAll,
  getPatrol,
  getPatrolsByUser,
  savePatrol,
  updatePatrolTotalSecond,
  applyPatchToPatrol,
  updateTime,
} = require("../controllers/patrols.controller");
const { debug } = require("../controllers/debug.controller");
const { verifyToken } = require("../controllers/auth.controller");

const router = Router();

router.get("", verifyToken, getAll);
router.get("/:id", verifyToken, getPatrol);
router.get("/users/:userId", verifyToken, getPatrolsByUser);
router.post("", debug, savePatrol);
router.post("/:id/patch", updatePatrolTotalSecond);
//router.put("/:id/patch", applyPatchToPatrol);
router.put("/:id", debug, updateTime);

module.exports = router;
