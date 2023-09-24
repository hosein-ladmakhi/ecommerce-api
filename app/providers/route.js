const express = require("express");
const {
  deleteProviderById,
  getProviderById,
  getProviders,
  updateProviderById,
  createNewProvider,
} = require("./controller");
const { validate } = require("../validationMiddleware");
const {
  updateProvidersValidation,
  createProvidersValidation,
} = require("./validation");
const router = express.Router();

router.get("/", getProviders);
router.get("/:id", getProviderById);
router.patch("/:id", validate(updateProvidersValidation), updateProviderById);
router.delete("/:id", deleteProviderById);
router.post("/", validate(createProvidersValidation), createNewProvider);

module.exports = router;
