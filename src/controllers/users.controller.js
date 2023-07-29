const prisma = require("../libs/prisma")

const getAll = async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
}

const getAllOrderByLastNameAsc = async (req, res) => {

}

const getByUserKey = async (req, res) => {
    
}

const saveUser = async (req, res) => {
    
}

const savePatrol = async (req, res) => {
    
}

const updateUser = async (req, res) => {
    
}

module.exports = {getAll, getAllOrderByLastNameAsc, getByUserKey, saveUser, savePatrol, updateUser}