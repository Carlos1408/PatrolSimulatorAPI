const prisma = require("../libs/prisma");

const getAll = async (req, res) => {
  console.log(req.headers);
  const maps = await prisma.map.findMany({
    include: { patrols: { include: { user: true, map: true } } },
  });
  res.json(maps);
};

const getMap = async (req, res) => {
  const { id } = req.params;
  const map = await prisma.map.findFirst({
    where: { id },
    include: { patrols: { include: { user: true, map: true } } },
  });
  if (map) res.json(map);
  else res.status(404).json({ error: "Not found" });
};

const getMapByName = async (req, res) => {
  const { name } = req.params;
  const map = await prisma.map.findFirst({
    where: { name },
  });
  console.log(map);
  if (map) res.status(200).json(map);
  else res.status(404).json({ error: "Not found" });
};

const save = async (req, res) => {
  const map = await prisma.map.create({ data: req.body });
  res.json(map);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { qualification, totalSeconds } = req.body;
  const patrol = prisma.patrol.update({
    where: { id },
    data: {
      qualification,
      totalSeconds,
    },
  });
};

module.exports = { getAll, getMap, save, getMapByName, update };
