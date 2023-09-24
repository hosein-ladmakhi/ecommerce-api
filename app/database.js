const mongoose = require("mongoose");

const initDatabase = async () => {
  const dbUrl = process.env.APP_DB_URL;
  await mongoose.connect(dbUrl);
  mongoose.connection.on("open", () => {
    console.log(`the database connected ...`);
  });
  mongoose.connection.on("error", () => {
    console.error("the database connection failed ...");
  });
};

module.exports = initDatabase;
