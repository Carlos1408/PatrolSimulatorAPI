const { Router } = require("express");
const { download } = require("../controllers/reports.controller");

const router = Router();

router.get("/patrols/download", download);

module.exports = router;
