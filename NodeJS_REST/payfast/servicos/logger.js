let winston = require("winston");

module.exports = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: "info",
      filename: "logs/payfastinfo.log",
      maxsize: 1000,
      maxFiles: 10
    })
  ]
});
