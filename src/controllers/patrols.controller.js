const prisma = require("../libs/prisma")

const getAll = async (req, res) => {
    const patrols = prisma.patrol.findMany()
    res.json(patrols)
}

const getPatrolByKey = async (req, res) => {
    
}

const getPatrolsByUserKey = async (req, res) => {
    
}

const savePatrol = async (req, res) => {
    console.log(req.body)
}

const updatePatrolTotalSecond = async (req, res) => {
    
}

const applyPatchToPatrol = async (req, res) => {
    
}

const updateTime = async (req, res) => {
    
}

module.exports = {getAll, getPatrolByKey, getPatrolsByUserKey, savePatrol, updatePatrolTotalSecond, applyPatchToPatrol, updateTime}