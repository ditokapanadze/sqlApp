const express = require("express");
require("express-async-errors");
const cookieParser = require("cookie-parser");
const verifyUser = require("./src/middlewares/verifyUser");
const app = express();

const globalErrorHandler = require("./src/middlewares/errorMiddleware.js");
const routes = require("./src/routes");

app.use(cookieParser());
const cors = require("cors");
const { emitter, events } = require("./src/utils/eventEmitter");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
    credentials: true,
  }),
);
emitter.on(events.test, (num) => {
  console.log(num);
});

emitter.emit(events.test, 3);
app.use(express.json());
app.use(verifyUser);
app.use("/api/v1", routes);
app.use(globalErrorHandler);
module.exports = app;
