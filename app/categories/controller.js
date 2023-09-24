const CategoryModel = require("./model");

exports.getCategories = async (request, response) => {
  const categories = await CategoryModel.find().sort({ createdAt: -1 });
  return response.status(200).json({ categories });
};

exports.getCategoryById = async (request, response) => {
  const id = request.params.id;
  const category = await CategoryModel.findById(id);
  if (!category) {
    return response
      .status(404)
      .json({ message: "no category exist with this id" });
  }
  return response.status(200).json({ category });
};

exports.createNewCategory = async (request, response) => {
  const duplicatedTitle = await CategoryModel.findOne({
    title: request.body.title,
  });
  if (duplicatedTitle) {
    return response.status(409).json({ message: "category is duplicated ..." });
  }
  const payload = {
    title: request.body.title,
    image: request.file.filename,
  };
  const category = await new CategoryModel(payload).save();
  return response.status(201).json({ category });
};

exports.updateCategoryById = async (request, response) => {
  const id = request.params.id;
  const category = await CategoryModel.findById(id);
  if (!category) {
    return response
      .status(404)
      .json({ message: "no category exist with this id" });
  }
  const duplicatedTitle = await CategoryModel.findOne({
    title: request.body.title,
  });
  if (duplicatedTitle && duplicatedTitle._id !== id) {
    return response.status(409).json({ message: "category is duplicated ..." });
  }
  category.title = request.body.title;
  await category.save();
  return response.status(200).json({ category });
};

exports.deleteCategoryById = async (request, response) => {
  const id = request.params.id;
  const category = await CategoryModel.findById(id);
  if (!category) {
    return response
      .status(404)
      .json({ message: "no category exist with this id" });
  }

  await category.deleteOne();
  return response.status(200).json({ category });
};
