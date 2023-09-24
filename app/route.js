const authRouter = require("./auth/route");
const categoriesRouter = require("./categories/route");
const productsRouter = require("./products/route");
const usersRouter = require("./users/route");
const providersRoute = require("./providers/route");

const initRouter = (expressApp) => {
  expressApp.use("/api/users", usersRouter);
  expressApp.use("/api/products", productsRouter);
  expressApp.use("/api/categories", categoriesRouter);
  expressApp.use("/api/auth", authRouter);
  expressApp.use("/api/providers", providersRoute);
};

module.exports = initRouter;
