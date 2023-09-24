const express = require("express");
const {
  createNewProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} = require("./controller");
const {
  createProductValidation,
  updateProductValidation,
} = require("./validation");
const { validate } = require("../validationMiddleware");
const { multerUploader } = require("../multerMiddleware");
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post(
  "/",
  multerUploader.single("image"),
  validate(createProductValidation),
  createNewProduct
);
router.patch("/:id", validate(updateProductValidation), updateProductById);
router.delete("/:id", deleteProductById);

module.exports = router;
