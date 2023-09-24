const bcrypt = require("bcryptjs");
const UserModel = require("./model");

exports.getUsers = async (request, response) => {
  const users = await UserModel.find().sort({ createdAt: -1 });
  return response.status(200).json({ users });
};

exports.getUserById = async (request, response) => {
  const id = request.params.id;
  const user = await UserModel.findById(id);
  if (!user) {
    return response.status(404).json({ message: "user is not found" });
  }
  return response.status(200).json({ user });
};

exports.updateUserById = async (request, response) => {
  const id = request.params.id;
  const user = await UserModel.findById(id);

  if (!user) {
    return response.status(404).json({ message: "user is not found" });
  }
  if (request.body.email) {
    const isEmailDuplicated = await UserModel.findOne({
      email: request.body.email,
    });

    if (isEmailDuplicated && isEmailDuplicated._id != id) {
      return response.status(409).json({ message: "email duplicated" });
    }
  }
  if (request.body.username) {
    const isUsernameDuplicated = await UserModel.findOne({
      username: request.body.username,
    });
    if (isUsernameDuplicated && isUsernameDuplicated._id != id) {
      return response.status(409).json({ message: "username duplicated" });
    }
  }
  const payload = { ...request.body };
  if (request.body.password) {
    payload.password = await bcrypt.hash(request.body.password, 8);
  }
  await UserModel.findByIdAndUpdate(id, payload);
  return response.status(200).json({ message: "user updated ..." });
};

exports.deleteUserById = async (request, response) => {
  const id = request.params.id;
  const user = await UserModel.findById(id);
  if (!user) {
    return response.status(404).json({ message: "user is not found" });
  }
  await user.deleteOne();
  return response.status(200).json({ user });
};
