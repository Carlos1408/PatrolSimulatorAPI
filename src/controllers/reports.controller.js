const prisma = require("../libs/prisma");

const patrols = async (req, res) => {
  const patrols = await prisma.patrol.findMany({
    include: {
      user: true,
      map: true,
      recognitionResult: true,
      ambushResult: true,
      combatResult: true,
    },
  });
  console.log(patrols);
  res.json(patrols);
};

const recognitions = async (req, res) => {
  const recognitions = await prisma.recognitionResult.findMany({
    include: {
      patrol: { include: { user: true, map: true } },
    },
  });
  console.log(recognitions);
  res.json(recognitions);
};

const ambushes = async (req, res) => {
  const ambushes = await prisma.ambushResult.findMany({
    include: { patrol: { include: { user: true, map: true } } },
  });
  console.log(ambushes);
  res.json(ambushes);
};

const combats = async (req, res) => {
  const combats = await prisma.combatResult.findMany({
    include: { patrol: { include: { user: true, map: true } } },
  });
  console.log(combats);
  res.json(combats);
};

module.exports = { patrols, recognitions, ambushes, combats };
