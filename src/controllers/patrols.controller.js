const prisma = require("../libs/prisma");

const getAll = async (req, res) => {
  const patrols = await prisma.patrol.findMany({
    include: { user: true, map: true },
  });
  res.json(patrols);
};

const getPatrol = async (req, res) => {
  const { id } = req.params;
  const patrol = await prisma.patrol.findFirst({
    where: { id },
    include: { user: true, map: true },
  });
  if (patrol) res.send(patrol);
  else res.status(404).json({ error: "Not Found" });
};

const getPatrolsByUser = async (req, res) => {
  const { userId } = req.params;
  const patrols = await prisma.patrol.findMany({
    where: { fk_user: userId },
    include: { user: true, map: true },
  });
  res.json(patrols);
};

const savePatrol = async (req, res) => {
  const { qualification, totalSeconds, userId, mapId } = req.body;
  const patrol = await prisma.patrol.create({
    data: {
      qualification,
      totalSeconds,
      user: { connect: { id: userId } },
      map: { connect: { id: mapId } },
    },
  });
  res.json(patrol);
};

const updatePatrolTotalSecond = async (req, res) => {
  const { id } = req.params;
  const { totalSeconds } = req.body;
  const patrol = await prisma.patrol.update({
    where: { id },
    data: {
      totalSeconds,
    },
  });
  res.json(patrol);
};

const applyPatchToPatrol = async (req, res) => {};

const updateTime = async (req, res) => {
  const { id } = req.params;
  const { totalSeconds } = req.body;
  const patrol = await prisma.patrol.update({
    where: { id },
    data: {
      totalSeconds,
    },
  });
  res.json(patrol);
};

module.exports = {
  getAll,
  getPatrol,
  getPatrolsByUser,
  savePatrol,
  updatePatrolTotalSecond,
  applyPatchToPatrol,
  updateTime,
};
