const express = require("express");
const dotenv = require("dotenv");
const initRouter = require("./route");
const initDatabase = require("./database");
dotenv.config();

const app = express();
const port = process.env.APP_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

initDatabase();
initRouter(app);

app.listen(port, () => {
  console.log(`The server running at port ${port}`);
});
