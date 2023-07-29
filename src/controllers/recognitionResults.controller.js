const prisma = require("../libs/prisma")

const getAll = async (req, res) => {
    const recognitionResults = prisma.recognitionResult.findMany()
    res.json(recognitionResults)
}

const getResultByKey = async (req, res) => {

}

const save = async (req, res) => {

}

const saveResult = async (req, res) => {

}

module.exports = {getAll, getResultByKey, save, saveResult}