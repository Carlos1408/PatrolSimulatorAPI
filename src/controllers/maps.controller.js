const prisma = require("../libs/prisma")

const getAll = async (req, res) => {
    const maps = prisma.map.findMany()
    res.json(maps)
}

const getByMapKey = async (req, res) => {
    
}

const save = async (req, res) => {
    
}

module.exports = {getAll, getByMapKey, save}