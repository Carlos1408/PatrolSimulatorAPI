const bcryptjs = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const users = [
  {
    username: "cclaurev",
    name: "Carlos",
    lastName: "Claure",
    email: "carlos.claure.vargas@gmail.com",
    password: "12345678",
    status: "active",
    rank: "Est",
    ffaa: "Ejercito",
  },
];

const maps = [
  { name: "Boyuibe", weather: "Frontera", type: "Recognition" },
  { name: "FortinRavelo", weather: "Frontera", type: "Recognition" },
  { name: "Mancaya", weather: "Frontera", type: "Recognition" },
  { name: "Pisiga", weather: "Frontera", type: "Recognition" },
  { name: "Potosi_O", weather: "Frontera", type: "Ambush" },
  { name: "Potosi_NO", weather: "Frontera", type: "Ambush" },
  { name: "Potosi_SO", weather: "Frontera", type: "Ambush" },
  { name: "Circuit1", weather: "Cirtuito", type: "Combat" },
];

async function main() {
  await users.forEach(async (u) => {
    const hash = await bcryptjs.hash(u.password, 8);
    const user = await prisma.user.create({
      data: {
        username: u.username,
        name: u.name,
        lastName: u.lastName,
        email: u.email,
        password: hash,
        status: u.status,
        rank: u.rank,
        ffaa: u.ffaa,
      },
    });
    console.log("Created ", user);
  });

  await maps.forEach(async (m) => {
    const map = await prisma.map.create({
      data: {
        name: m.name,
        weather: m.weather,
        type: m.type,
      },
    });
    console.log("Created ", map);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
