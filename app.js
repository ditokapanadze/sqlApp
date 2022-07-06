const express = require("express");
require("express-async-errors");
const cookieParser = require("cookie-parser");
const verifyUser = require("./src/middlewares/verifyUser");
const app = express();
const socket = require("./socket.js");
const globalErrorHandler = require("./src/middlewares/errorMiddleware.js");
const routes = require("./src/routes");
const http = require("http");
const client = require("./src/config/redis");
const server = http.createServer(app);
app.use(cookieParser());
const cors = require("cors");
console.log(client);
socket(server);

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(verifyUser);
app.use("/api/v1", routes);
app.use(globalErrorHandler);
module.exports = server;
