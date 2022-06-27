// const { createLogger, transports, format } = require("winston");

// const customerLogger = createLogger({
//   transports: [
//     new transports.File({
//       filename: "customer.log",
//       level: "info",
//       format: format.combine(format.timestamp(), format.json()),
//     }),
//     new transports.File({
//       filename: "customer-error.log",
//       level: "error",
//       format: format.combine(format.timestamp(), format.json()),
//     }),
//   ],
// });

// module.exports = {
//   customerLogger,
// };

const { createLogger, transports, format } = require("winston");

const customFormat = format.combine(
  format.timestamp(),
  format.printf((info) => {
    return `${info.timestamp}-[${info.level.toUpperCase().padEnd(7)}] -${
      info.message
    }`;
  }),
);

const logger = createLogger({
  format: customFormat,
  transports: [
    new transports.Console(),
    new transports.File({ filename: "app.log" }),
  ],
});

module.exports = logger;
