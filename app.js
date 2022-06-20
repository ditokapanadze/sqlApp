const express = require("express");
require("express-async-errors");
const cookieParser = require("cookie-parser");
const deserializeUser = require("./src/middlewares/deserializeUser");
const app = express();
const AppError = require("./src/utils/appError");
const globalErrorHandler = require("./src/middlewares/errorMiddleware.js");
const routes = require("./src/routes");
app.use(cookieParser());
const cors = require("cors");

app.use(cors());

app.use(deserializeUser);
app.use(express.json());
app.use("/api/v1", routes);
// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });
app.use(globalErrorHandler);
module.exports = app;
