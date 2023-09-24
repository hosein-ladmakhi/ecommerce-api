const express = require("express");
const {
  createNewCategory,
  deleteCategoryById,
  getCategories,
  getCategoryById,
  updateCategoryById,
} = require("./controller");
const { validate } = require("../validationMiddleware");
const {
  createCategoryValidation,
  updateCategoryValidation,
} = require("./validation");
const { multerUploader } = require("../multerMiddleware");
const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post(
  "/",
  multerUploader.single("image"),
  validate(createCategoryValidation),
  createNewCategory
);
router.patch("/:id", validate(updateCategoryValidation), updateCategoryById);
router.delete("/:id", deleteCategoryById);

module.exports = router;
