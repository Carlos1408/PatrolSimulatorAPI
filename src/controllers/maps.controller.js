const prisma = require("../libs/prisma");

const getAll = async (req, res) => {
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

const save = async (req, res) => {
  const map = await prisma.map.create({ data: req.body });
  res.json(map);
};

module.exports = { getAll, getMap, save };
