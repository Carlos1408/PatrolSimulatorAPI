const prisma = require("../libs/prisma");
const bcryptjs = require("bcryptjs");

const getAll = async (req, res) => {
  const users = await prisma.user.findMany({ include: { patrols: true } });
  res.json(users);
};

const getAllOrderByLastNameAsc = async (req, res) => {
  const users = await prisma.user.findMany({
    orderBy: [{ lastName: "asc" }],
    include: { patrols: true },
  });
  res.json(users);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findFirst({
    where: { id },
    include: { patrols: true },
  });
  res.json(user);
};

const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  const user = await prisma.user.findFirst({ where: { username } });
  if (user) res.status(200).json(user);
  else res.status(404).json();
};

const saveUser = async (req, res) => {
  const { username, name, lastName, email, password, status, rank, ffaa } =
    req.body;
  const hash = await bcryptjs.hash(password, 8);
  const user = await prisma.user.create({
    data: {
      username,
      name,
      lastName,
      email,
      password: hash,
      status,
      rank,
      ffaa,
    },
  });
  res.json(user);
};

const savePatrol = async (req, res) => {};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, name, lastName, email, status, rank, ffaa, password } =
    req.body;
  const hash = await bcryptjs.hash(password, 8);
  const user = await prisma.user.update({
    where: { id },
    data: {
      username,
      name,
      lastName,
      email,
      status,
      rank,
      ffaa,
      // password: hash,
    },
  });
  res.json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({ where: { id } });
  res.json(user);
};

module.exports = {
  getAll,
  getAllOrderByLastNameAsc,
  getUser,
  saveUser,
  savePatrol,
  updateUser,
  deleteUser,
  getUserByUsername,
};
