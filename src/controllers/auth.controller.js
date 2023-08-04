const prisma = require("../libs/prisma");
const bycript = require("bcryptjs");

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findFirst({ where: { username } });
  if (user) {
    await bycript.compare(password, user.password, (err, succ) => {
      if (err) console.log(err);
      if (succ) {
        console.log(user);
        res.status(200).json(user);
      } else res.status(401).json();
    });
  } else res.status(404).json();
};

const signInUsingToken = async (req, res) => {};

module.exports = { login, signInUsingToken };
