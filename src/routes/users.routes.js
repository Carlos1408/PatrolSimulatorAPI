const { Router } = require("express");
const {
  getAll,
  getAllOrderByLastNameAsc,
  getByUserKey,
  saveUser,
  savePatrol,
  updateUser,
} = require("../controllers/users.controller");

const router = Router();

router.get("", getAll);
router.get("/OrderBy", getAllOrderByLastNameAsc);
router.get("/:userKey", getByUserKey);
router.post("", saveUser);
router.post("/:id/patrol", savePatrol);
router.put("/:key", updateUser);

module.exports = router;
