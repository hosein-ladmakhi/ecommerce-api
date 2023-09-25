const express = require('express');
const {
  deleteProviderById,
  getProviderById,
  getProviders,
  updateProviderById,
  createNewProvider,
} = require('./controller');
const { validate } = require('../validationMiddleware');
const {
  updateProvidersValidation,
  createProvidersValidation,
} = require('./validation');
const { multerUploader } = require('../multerMiddleware');
const { authMiddleware } = require('../authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getProviders);
router.get('/:id', authMiddleware, getProviderById);
router.patch(
  '/:id',
  authMiddleware,
  validate(updateProvidersValidation),
  updateProviderById,
);
router.delete('/:id', authMiddleware, deleteProviderById);
router.post(
  '/',
  authMiddleware,
  multerUploader.single('logo'),
  validate(createProvidersValidation),
  createNewProvider,
);

module.exports = router;
