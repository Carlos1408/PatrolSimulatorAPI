const prisma = require("../libs/prisma");

const getAll = async (req, res) => {
  const ambushes = await prisma.ambushResult.findMany();
  res.json(ambushes);
};

const get = async (req, res) => {
  const { id } = req.params;
  const ambush = await prisma.ambushResult.findFirst({ where: { id } });
  if (ambush) res.json(ambush);
  else res.status(404).json({ error: "Not Found" });
};

const create = async (req, res) => {
  const { formation, qualification, patrolId } = req.body;
  const ambush = await prisma.ambushResult.create({
    data: {
      formation,
      qualification,
      patrol: { connect: { id: patrolId } },
    },
  });
  console.log(ambush);
  res.json(ambush);
};

module.exports = { getAll, get, create };
