const express = require('express');
const {
  createNewProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} = require('./controller');
const {
  createProductValidation,
  updateProductValidation,
} = require('./validation');
const { validate } = require('../validationMiddleware');
const { multerUploader } = require('../multerMiddleware');
const { authMiddleware } = require('../authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getProducts);
router.get('/:id', authMiddleware, getProductById);
router.post(
  '/',
  authMiddleware,
  multerUploader.single('image'),
  validate(createProductValidation),
  createNewProduct,
);
router.patch(
  '/:id',
  authMiddleware,
  validate(updateProductValidation),
  updateProductById,
);
router.delete('/:id', authMiddleware, deleteProductById);

module.exports = router;
