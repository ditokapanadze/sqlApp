const express = require("express");
require("express-async-errors");

const app = express();
const AppError = require("./src/utils/appError");
const globalErrorHandler = require("./src/middlewares/errorMiddleware.js");
const routes = require("./src/routes");
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use("/api/v1", routes);
// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });
app.use(globalErrorHandler);
module.exports = app;
