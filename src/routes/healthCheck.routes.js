const { Router } = require("express");
const { debug } = require("../controllers/debug.controller");

const router = Router();

router.get("/", debug, (req, res) => {
  const health = {
    uptime: process.uptime(),
    responseTime: process.hrtime(),
    message: "OK",
    timestamp: Date.now(),
  };
  try {
    res.status(200).json(health);
  } catch (e) {
    health.message = e;
    res.status(503).send();
  }
});

router.post("/", debug, (req, res) => {
  res.json();
});

module.exports = router;
