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

const router = Router();

router.get("", getAll);
router.get("/:id", getPatrol);
router.get("/users/:userId", getPatrolsByUser);
router.post("", savePatrol);
router.post("/:id/patch", updatePatrolTotalSecond);
//router.put("/:id/patch", applyPatchToPatrol);
router.put("/:id", updateTime);

module.exports = router;
