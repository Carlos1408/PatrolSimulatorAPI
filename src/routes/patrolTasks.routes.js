const { Router } = require("express");
const {getPatrol, save} = require("../controllers/patrolTasks.controller")
const { verifyToken } = require("../controllers/auth.controller");

const router = Router();

router.get("/:id", getPatrol)
router.post("/:patrolId", save)

module.exports = router