const ProvidersModel = require("./model");

exports.getProviders = async (request, response) => {
  const providers = await ProvidersModel.find().sort({ createdAt: -1 });
  return response.status(200).json({ providers });
};

exports.getProviderById = async (request, response) => {
  const id = request.params.id;
  const provider = await ProvidersModel.findById(id);
  if (!provider) {
    return response.status(404).json({ message: "provider is not found" });
  }
  return response.status(200).json({ provider });
};

exports.updateProviderById = async (request, response) => {
  const id = request.params.id;
  const provider = await ProvidersModel.findById(id);
  if (!provider) {
    return response.status(404).json({ message: "provider is not found" });
  }

  if (request.body.name) {
    const duplicatedName = await ProvidersModel.findOne({
      name: request.body.name,
    });
    if (duplicatedName && duplicatedName._id != id) {
      return response.status(409).json({ message: "name is duplicated" });
    }
  }
  await ProvidersModel.findByIdAndUpdate(id, request.body);
  return response.status(200).json({ message: "updated successfully ...." });
};

exports.deleteProviderById = async (request, response) => {
  const id = request.params.id;
  const provider = await ProvidersModel.findById(id);
  if (!provider) {
    return response.status(404).json({ message: "provider is not found" });
  }
  await provider.deleteOne();
  return response.status(200).json({ message: "deleted successfully" });
};

exports.createNewProvider = async (request, response) => {
  const duplicatedName = await ProvidersModel.findOne({
    name: request.body.name,
  });
  if (duplicatedName) {
    return response.status(409).json({ message: "name is duplicated" });
  }
  const payload = { ...request.body, logo: request.file.filename };
  const provider = await new ProvidersModel(payload).save();
  return response.status(201).json({ provider });
};
