const prisma = require("../libs/prisma");
const bycript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await prisma.user.findFirst({ where: { username: email } });
  console.log(user);
  if (user) {
    await bycript.compare(password, user.password, (err, succ) => {
      if (err) console.log(err);
      if (succ) {
        console.log(user);
        const token = jwt.sign({ id: user.id, exp: 1698113977 }, "secretkey");
        res.status(200).json({ accessToken: token, user: user });
      } else res.status(401).json();
    });
  } else res.status(404).json();
};

const signInUsingToken = async (req, res) => {
  const { accessToken } = req.body;
  const decoded = jwt_decode(accessToken);
  const user = await prisma.user.findFirst({ where: { id: decoded.id } });
  console.log(user);
  if (user) {
    const token = jwt.sign({ id: user.id, exp: 1698113977 }, "secretkey");
    res.status(200).json({ accessToken: token, user: user });
  } else res.status(404).json();
};

const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "unauthorized" });
    }
    const token = req.headers.authorization.split(" ")[1];
    if (token === "null") {
      return res.status(401).json({ message: "unauthorized" });
    }
    const payload = await jwt.verify(token, "secretkey");
    if (!payload) {
      return res.status(401).json({ message: "unauthorized" });
    }
    const decoded = jwt_decode(token);
    const user = await prisma.user.findFirst({ where: { id: decoded.id } });
    if (user) next();
    else return res.status(401).json({ message: "unauthorized" });
  } catch (err) {
    return res.status(401).json({ message: "unauthorized" });
  }
};
module.exports = { login, signInUsingToken, verifyToken };
