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

router.get("", verifyToken, getAll);
router.get("/OrderBy", verifyToken, getAllOrderByLastNameAsc);
router.get("/:id", verifyToken, getUser);
router.get("/name/:username", verifyToken, getUserByUsername);
router.post("", verifyToken, saveUser);
router.post("/:id/patrol", savePatrol);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
