const { Router } = require("express");
const {
  patrols,
  recognitions,
  ambushes,
  combats,
} = require("../controllers/reports.controller");
const { verifyToken } = require("../controllers/auth.controller");

const router = Router();

router.get("/patrols", patrols);
router.get("/recognitions", recognitions);
router.get("/ambushes", ambushes);
router.get("/combats", combats);

module.exports = router;
