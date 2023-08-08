const prisma = require("../libs/prisma");

const getAll = async (req, res) => {
  const recognitionResults = prisma.recognitionResult.findMany({
    include: { patrol: true },
  });
  res.json(recognitionResults);
};

const getResult = async (req, res) => {
  const { id } = req.params;
  const recognitionResult = prisma.recognitionResult.findFirst({
    where: { id },
  });
  res.json(recognitionResult);
};

const save = async (req, res) => {
  const {
    patrolId,
    formationsQualification,
    techniquesRecognitionsQualifications,
    qualification,
  } = req.body;
  const recognitionResult = await prisma.recognitionResult.create({
    data: {
      formationsQualification,
      techniquesRecognitionsQualifications,
      qualification,
      patrol: { connect: { id: patrolId } },
    },
  });
  res.json(recognitionResult);
};

const saveResult = async (req, res) => {};

module.exports = { getAll, getResult, save, saveResult };
