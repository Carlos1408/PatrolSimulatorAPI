const { Router } = require("express");
const {
  getAll,
  getAllOrderByLastNameAsc,
  getUser,
  saveUser,
  savePatrol,
  updateUser,
  deleteUser,
  getUserByUsername,
} = require("../controllers/users.controller");
const { verifyToken } = require("../controllers/auth.controller");

const router = Router();

router.get("", getAll);
router.get("/OrderBy", getAllOrderByLastNameAsc);
router.get("/:id", getUser);
router.get("/name/:username", getUserByUsername);
router.post("", saveUser);
router.post("/:id/patrol", savePatrol);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
