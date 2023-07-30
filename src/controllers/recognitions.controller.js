const prisma = require("../libs/prisma");

const getAll = async (req, res) => {
  const recognitions = await prisma.recognition.findMany({
    include: { patrol: true },
  });
  res.json(recognitions);
};

const getRecognition = async (req, res) => {
  const { id } = req.params;
  const recognition = await prisma.recognition.findFirst({
    where: { id },
    include: { patrol: true },
  });
  res.json(recognition);
};

const save = async (req, res) => {
  const {
    patrolId,
    watchtowers,
    tank,
    helicopter,
    alternativeRoute,
    mortar,
    jeep,
  } = req.body;
  const recognition = await prisma.recognition.create({
    data: {
      watchtowers,
      tank,
      helicopter,
      alternativeRoute,
      mortar,
      jeep,
      patrol: { connect: { id: patrolId } },
    },
  });
  return recognition;
};

const saveRecognition = async (req, res) => {};

module.exports = { getAll, getRecognition, save, saveRecognition };
