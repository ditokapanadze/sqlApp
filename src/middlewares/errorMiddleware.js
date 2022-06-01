const { __prod__, NODE_ENV } = require("../constant");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    ...(!__prod__ && { stacktrace: err.stack }),
  });
};
