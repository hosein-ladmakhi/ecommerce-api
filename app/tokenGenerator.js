const jwt = require("jsonwebtoken");

module.exports = {
  tokenGenerator: function (payload) {
    return {
      token: jwt.sign(payload, "supersecreykey", { expiresIn: "24h" }),
    };
  },
};
