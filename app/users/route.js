const express = require('express');
const {
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} = require('./controller');
const { validate } = require('../validationMiddleware');
const { updateUserValidation } = require('./validation');
const { authMiddleware } = require('../authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getUsers);
router.get('/:id', authMiddleware, getUserById);
router.patch(
  '/:id',
  authMiddleware,
  validate(updateUserValidation),
  updateUserById,
);
router.delete('/:id', authMiddleware, deleteUserById);

module.exports = router;
