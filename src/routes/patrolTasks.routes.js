const { Router } = require("express");
const {getPatrolByKey, save} = require("../controllers/patrolTasks.controller")

const router = Router();

router.get("/:key", getPatrolByKey)

module.exports = router