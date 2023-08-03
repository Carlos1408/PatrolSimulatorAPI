const prisma = require("../libs/prisma");

const getAll = async (req, res) => {
  const combats = await prisma.combatResult.findMany();
  res.json(combats);
};

const get = async (req, res) => {
  const { id } = req.params;
  const combat = await prisma.combatResult.findFirst({ where: { id } });
  if (combat) res.json(combat);
  else res.status(404).json({ error: "Not Found" });
};

const create = async (req, res) => {
  const { id } = req.params;
  const {
    patrolId,
    q_enemies,
    q_friend_deaths,
    q_enemy_deaths,
    totalSeconds,
    player_dead,
  } = req.body;
  const combat = await prisma.combatResult.create({
    data: {
      q_enemies,
      q_friend_deaths,
      q_enemy_deaths,
      totalSeconds,
      player_dead,
      patrol: { connect: { id: patrolId } },
    },
  });
  console.log(combat);
  res.json(combat);
};

module.exports = { getAll, get, create };
