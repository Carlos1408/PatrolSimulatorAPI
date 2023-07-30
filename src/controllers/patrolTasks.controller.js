const prisma = require("../libs/prisma");
const { connect } = require("../routes/patrols.routes");

const getPatrol = async (req, res) => {
  const { id } = req.params;
  const patrolTask = await prisma.patrol.findFirst({ id });
  if (patrolTask) res.json(patrolTask);
  else res.status(404).json({ error: "Not Found" });
};

const save = async (req, res) => {
  const { patrolId } = req.params;
  const patrolTask = await prisma.patrolTask.create({
    data: {
      fk_patrol: patrolId,
    },
  });
  res.json(patrolTask);
};

module.exports = { getPatrol, save };
