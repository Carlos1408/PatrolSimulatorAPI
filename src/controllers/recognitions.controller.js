const prisma = require("../libs/prisma")

const getAll = async (req, res) => {
    const recognitions = prisma.recognition.findMany()
}

const getRecognitionByKey = async (req, res) => {
    
}

const save = async (req, res) => {
    
}

const saveRecognition = async (req, res) => {
    
}

module.exports = {getAll, getRecognitionByKey, save, saveRecognition}