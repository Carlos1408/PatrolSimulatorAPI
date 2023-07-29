const { Router } = require("express");
const {
  getAll,
  getPatrolByKey,
  getPatrolsByUserKey,
  savePatrol,
  updatePatrolTotalSecond,
  applyPatchToPatrol,
  updateTime,
} = require("../controllers/patrols.controller");

const router = Router();

router.get("", getAll);
router.get("/:patrolKey", getPatrolByKey);
router.get("/users/:userKey", getPatrolsByUserKey);
router.post("", savePatrol);
router.post("/:patrolKey/tasks", updatePatrolTotalSecond);
router.put("/:patrolKey/patch", applyPatchToPatrol);
router.put("/:patrolKey", updateTime);

module.exports = router;
