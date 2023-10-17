const { Router } = require("express");
const { debug } = require("../controllers/debug.controller");
const prisma = require("../libs/prisma");

const router = Router();

router.get("/", debug, (req, res) => {
  const health = {
    uptime: process.uptime(),
    responseTime: process.hrtime(),
    message: "OK",
    timestamp: Date.now(),
  };
  try {
    res.status(200).json(health);
  } catch (e) {
    health.message = e;
    res.status(503).send();
  }
});

router.post("/", debug, async (req, res) => {
  const newUsers = await prisma.user.findMany();
  const newMaps = await prisma.map.findMany();
  for (let i = 0; i < 50; i++) {
    console.log("\nNUEVO REGISTRO-----------------");
    const auxUser = newUsers[Math.floor(Math.random() * newUsers.length)];
    const auxMap = newMaps[Math.floor(Math.random() * newMaps.length)];
    console.log(auxUser);
    console.log(auxMap);

    const prob = Math.floor(Math.random() * 3) + 1;

    // RECOGNITIONS
    if (prob == 1) {
      if (auxMap.type == "Recognition") {
        const formationsQualification =
          (Math.floor(Math.random() * 100) + 1) / 10;
        const techniquesRecognitionsQualifications =
          (Math.floor(Math.random() * 100) + 1) / 10;

        const qualification =
          (formationsQualification + techniquesRecognitionsQualifications) / 2;
        const totalSeconds = 120 + Math.floor(Math.random() * 600) + 60;

        const patrolId = await createPatrol(
          qualification,
          totalSeconds,
          auxUser.id,
          auxMap.id
        );

        const recognitionResult = await prisma.recognitionResult.create({
          data: {
            formationsQualification,
            techniquesRecognitionsQualifications,
            qualification,
            patrol: { connect: { id: patrolId } },
          },
        });

        console.log(recognitionResult);
      } else i = i - 1;
    }

    //COMBATS
    if (prob == 2) {
      if (auxMap.type == "Combat") {
        const q_enemies = Math.floor(Math.random() * 20) + 1;
        let q_friend_deaths = 0;
        let q_enemy_deaths = 0;

        const combatProb = Math.floor(Math.random() * 2);
        //friends win
        if (combatProb == 0) {
          q_friend_deaths = Math.floor(Math.random() * 17) + 1;
          q_enemy_deaths = q_enemies;
        }
        //enemies win
        if (combatProb == 1) {
          q_enemy_deaths = Math.floor(Math.random() * q_enemies);
          q_friend_deaths = 17;
        }
        const player_dead = Math.floor(Math.random() * 2) ? true : false;
        const qualification =
          (q_enemy_deaths / q_enemies) * 10 - (q_friend_deaths / 18) * 10;
        const totalSecondsCombat = 60 + Math.floor(Math.random() * 60);

        const totalSeconds =
          totalSecondsCombat + Math.floor(Math.random() * 600) + 60;
        const patrolId = await createPatrol(
          qualification,
          totalSeconds,
          auxUser.id,
          auxMap.id
        );

        const combat = await prisma.combatResult.create({
          data: {
            q_enemies,
            q_friend_deaths,
            q_enemy_deaths,
            qualification: qualification > 0 ? qualification : 0.1,
            totalSeconds: totalSecondsCombat,
            player_dead,
            patrol: { connect: { id: patrolId } },
          },
        });
        console.log(combat);
      } else i = i - 1;
    }

    //AMBUSH
    if (prob == 3) {
      if (auxMap.type == "Ambush") {
        const q_enemies = Math.floor(Math.random() * 20) + 1;
        let q_friend_deaths = 0;
        let q_enemy_deaths = 0;

        const combatProb = Math.floor(Math.random() * 2);
        //friends win
        if (combatProb == 0) {
          q_friend_deaths = Math.floor(Math.random() * 17) + 1;
          q_enemy_deaths = q_enemies;
        }
        //enemies win
        if (combatProb == 1) {
          q_enemy_deaths = Math.floor(Math.random() * q_enemies);
          q_friend_deaths = 17;
        }
        const player_dead = Math.floor(Math.random() * 2) ? true : false;
        const qualificationCombat =
          (q_enemy_deaths / q_enemies) * 10 - (q_friend_deaths / 18) * 10;
        const totalSecondsCombat = 60 + Math.floor(Math.random() * 60);

        const formations = ["Linea", "L", "V"];
        const formation =
          formations[Math.floor(Math.random() * formations.length)];
        const qualificationAmbush = (Math.floor(Math.random() * 100) + 1) / 10;

        const qualification = (qualificationCombat + qualificationAmbush) / 2;

        const totalSeconds =
          totalSecondsCombat + Math.floor(Math.random() * 600) + 60;
        const patrolId = await createPatrol(
          qualification,
          totalSeconds,
          auxUser.id,
          auxMap.id
        );

        const combat = await prisma.combatResult.create({
          data: {
            q_enemies,
            q_friend_deaths,
            q_enemy_deaths,
            qualification: qualification > 0 ? qualification : 0.1,
            totalSeconds: totalSecondsCombat,
            player_dead,
            patrol: { connect: { id: patrolId } },
          },
        });
        console.log(combat);

        const ambush = await prisma.ambushResult.create({
          data: {
            formation,
            qualification: qualificationAmbush,
            patrol: { connect: { id: patrolId } },
          },
        });
        console.log(ambush);
      } else i = i - 1;
    }
  }
  res.json({ message: "Succesfull" });
});

async function createPatrol(qualification, totalSeconds, userId, mapId) {
  const patrol = await prisma.patrol.create({
    data: {
      created: new Date(
        `August 9, 2023 ${Math.floor(Math.random() * 4) + 8}:${
          Math.floor(Math.random() * 50) + 1
        }:${Math.floor(Math.random() * 50) + 1}`
      ),
      //qualification,
      totalSeconds,
      user: { connect: { id: userId } },
      map: { connect: { id: mapId } },
    },
  });
  console.log(patrol);
  return patrol.id;
}

module.exports = router;
