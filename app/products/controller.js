const ProductModel = require("./model");
const CategoryModel = require("../categories/model");

exports.getProducts = async (request, response) => {
  const products = await ProductModel.find().sort({ createdAt: -1 });
  return response.status(200).json({ products });
};

exports.getProductById = async (request, response) => {
  const id = request.params.id;
  const product = await ProductModel.findById(id);
  if (!product) {
    return response.status(404).json({ message: "product is not found" });
  }
  return response.status(200).json({ product });
};

exports.createNewProduct = async (request, response) => {
  const duplicatedProduct = await ProductModel.findOne({
    title: request.body.title,
  });
  if (duplicatedProduct) {
    return response.status(409).json({ message: "title is duplicated ..." });
  }
  const category = await CategoryModel.findById(request.body.category);
  if (!category) {
    return response.status(404).json({ message: "category not found" });
  }
  const payload = {
    title: request.body.title,
    description: request.body.description,
    quantity: request.body.quantity,
    price: request.body.price,
    image: request.file.filename,
    category,
  };
  const product = await new ProductModel(payload).save();
  return response.status(201).json({ product });
};

exports.updateProductById = async (request, response) => {
  const id = request.params.id;
  const product = await ProductModel.findById(id);
  if (!product) {
    return response.status(404).json({ message: "product is not found" });
  }
  const payload = { ...request.body };
  if (request.body.title) {
    const duplicatedProduct = await ProductModel.findOne({
      title: request.body.title,
    });
    if (duplicatedProduct && id !== duplicatedProduct._id) {
      return response.status(409).json({ message: "title is duplicated ..." });
    }
  }
  if (request.body.category) {
    const category = await CategoryModel.findById(request.body.category);
    if (!category) {
      return response.status(404).json({ message: "category not found" });
    }
    payload.category = category;
  }
  await ProductModel.findByIdAndUpdate(id, { $set: payload });
  return response.status(200).json({ product: { ...product, ...payload } });
};

exports.deleteProductById = async (request, response) => {
  const id = request.params.id;
  const product = await ProductModel.findById(id);
  if (!product) {
    return response.status(404).json({ message: "product is not found" });
  }
  await product.deleteOne();
  return response.status(200).json({ product });
};
