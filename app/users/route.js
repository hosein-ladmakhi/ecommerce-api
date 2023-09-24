const express = require("express");
const {
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} = require("./controller");
const { validate } = require("../validationMiddleware");
const { updateUserValidation } = require("./validation");
const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.patch("/:id", validate(updateUserValidation), updateUserById);
router.delete("/:id", deleteUserById);

module.exports = router;
