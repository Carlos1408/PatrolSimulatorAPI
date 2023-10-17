const bcryptjs = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const users = [
  {
    id: "8c4de07a-1cc0-4db6-9f46-2f6ca8255eb9",
    username: "cclaurev",
    name: "Carlos",
    lastName: "Claure",
    email: "carlos.claure.vargas@gmail.com",
    password: "$2a$08$YTTaxJ5GCJZmJJ.fgVHjNu4.2M53zzuYvuePskC59LqTysWu5j5R6",
    status: "active",
    rank: "Est",
    ffaa: "Ejercito",
    created: "2023-08-09T13:54:05.891Z",
    update: "2023-08-09T13:54:05.891Z",
  },
  {
    id: "f13cd803-08bf-4208-b1f2-4d78f95c4e63",
    username: "angel",
    name: "gabriel",
    lastName: "rocha",
    email: "gabitorochester@gmail.com",
    password: "$2a$08$EvLrkY5F7ZQCexkVac38juSZo0DE2Tq96MfQkfT4JVZaF/W2TkVOW",
    status: "active",
    rank: "est",
    ffaa: "ejercito",
    created: "2023-08-09T14:22:01.979Z",
    update: "2023-08-09T14:22:01.979Z",
  },
  {
    id: "b5824424-37f3-4326-8777-b227d096c810",
    username: "ingridh26",
    name: "ingridh",
    lastName: "coaquira",
    email: "ingridhcoaquira@gmail.com",
    password: "$2a$08$k5wqX7N2sYlFuj.S.fHZTeQiCbwrytxa5Vz..SQLY5EW9u8gqJI9G",
    status: "active",
    rank: "est",
    ffaa: "ejercito",
    created: "2023-08-09T14:39:19.561Z",
    update: "2023-08-09T14:39:19.561Z",
  },
  {
    id: "63fb5111-13b7-49cf-a855-a2d79a2c098a",
    username: "rhai6",
    name: "Rhaiza",
    lastName: "Apaza",
    email: "rhaizapaza@gmail.com",
    password: "$2a$08$mDlMTGVMgGoXCFvWmkP0LuM9qoSNoKeBZsoLcGcrkNwp845d4U5n6",
    status: "active",
    rank: "est",
    ffaa: "ejercito",
    created: "2023-08-09T14:50:17.015Z",
    update: "2023-08-09T14:50:17.015Z",
  },
  {
    id: "b518431a-9477-4e2b-ac1c-3a981cb01606",
    username: "wpcfbedark",
    name: "sebastian ",
    lastName: "cuellar",
    email: "lobogamerplay68@gmail.com",
    password: "$2a$08$GwemfjDLDhOZPdCmoXPeLuE4uI1b0yIDZPtb0lkc/Xcfr9Hif5Fai",
    status: "active",
    rank: "est",
    ffaa: "no compete",
    created: "2023-08-09T15:06:18.047Z",
    update: "2023-08-09T15:06:18.047Z",
  },
  {
    id: "7e7ad05d-e201-43af-9fc0-9b42c84a5cfe",
    username: "srmustafa",
    name: "eric",
    lastName: "uribe",
    email: "sr.mustafa2006@gamil.com",
    password: "$2a$08$zQBxeUR9TwdDZN/rCbHLMuGYS66NWJRmilfP/6BkOKZg0wyL67fqK",
    status: "active",
    rank: "est",
    ffaa: "ejercito",
    created: "2023-08-09T15:20:45.924Z",
    update: "2023-08-09T15:20:45.924Z",
  },
  {
    id: "63a86491-b212-4f32-9044-629998b08ad4",
    username: "jhon213",
    name: "david",
    lastName: "fernandez",
    email: "jfernandezr3@gmail.com",
    password: "$2a$08$/mp942ZYYX3xD7nuHwLYOO/fLhExtmsZOm.a5ecxlrIol7M8g.op2",
    status: "active",
    rank: "est",
    ffaa: "ejercito",
    created: "2023-08-09T15:51:03.781Z",
    update: "2023-08-09T15:51:03.781Z",
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
  { name: "Circuit2", weather: "Cirtuito", type: "Combat" },
];

async function main() {
  await users.forEach(async (u) => {
    // const hash = await bcryptjs.hash(u.password, 8);
    const hash = await bcryptjs.hash("12345678", 8);
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
        created: u.created,
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

async function createPatrol(qualification, totalSeconds, userId, mapId) {
  const patrol = await prisma.patrol.create({
    data: {
      created: new Date(`August 9, 2023 ${Math.floor(Math.random() * 4) + 9}:${Math.floor(Math.random() * 60) + 1}:${Math.floor(Math.random() * 60) + 1}`),
      qualification,
      totalSeconds,
      user: { connect: { id: userId } },
      map: { connect: { id: mapId } },
    },
  });
  console.log(patrol);
  return patrol.id
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
