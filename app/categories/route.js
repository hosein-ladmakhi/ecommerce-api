const express = require('express');
const {
  createNewCategory,
  deleteCategoryById,
  getCategories,
  getCategoryById,
  updateCategoryById,
} = require('./controller');
const { validate } = require('../validationMiddleware');
const {
  createCategoryValidation,
  updateCategoryValidation,
} = require('./validation');
const { multerUploader } = require('../multerMiddleware');
const { authMiddleware } = require('../authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getCategories);
router.get('/:id', authMiddleware, getCategoryById);
router.post(
  '/',
  authMiddleware,
  multerUploader.single('image'),
  validate(createCategoryValidation),
  createNewCategory,
);
router.patch(
  '/:id',
  authMiddleware,
  validate(updateCategoryValidation),
  updateCategoryById,
);
router.delete('/:id', authMiddleware, deleteCategoryById);

module.exports = router;
