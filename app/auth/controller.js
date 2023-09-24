const UserModel = require("../users/model");
const bcrypt = require("bcryptjs");
const { tokenGenerator } = require("../tokenGenerator");

exports.signIn = async (request, response) => {
  const user = await UserModel.findOne({ username: request.body.username });
  if (!user) {
    return response.status(404).json({ message: "user not found" });
  }
  const comparePassword = await bcrypt.compare(
    request.body.password,
    user.password
  );
  if (!comparePassword) {
    return response.status(404).json({ message: "user not found" });
  }
  const { token } = tokenGenerator({ _id: user._id });
  return response
    .status(200)
    .json({ message: "user signin successfully ...", token });
};

exports.signUp = async (request, response) => {
  const isEmailOrUsernameDuplicated = await UserModel.findOne({
    $or: [{ email: request.body.email }, { username: request.body.username }],
  });

  if (isEmailOrUsernameDuplicated) {
    return response
      .status(409)
      .json({ message: "username or email duplicated" });
  }

  const passwordHash = await bcrypt.hash(request.body.password, 8);
  const payload = {
    ...request.body,
    password: passwordHash,
    image: request.file.filename,
  };
  const user = await new UserModel(payload).save();
  const { token } = tokenGenerator({ _id: user._id });
  return response
    .status(201)
    .json({ message: "user signup successfully ...", token });
};
