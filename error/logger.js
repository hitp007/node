const { createLogger, transports } = require("winston");
const { AppError } = require("./error-handler");
const clc = require('cli-color')

const LogErrors = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({ filename: "app_error.log" }),
  ],
});

class ErrorLogger {
  constructor() {}
  async logError(err) {
    LogErrors.log({
      level: "error",
      error: `${err.statusCode} :- `+`${err.message}`,
    });
    return false;
  }

  isTrustError(error) {
    if (error instanceof AppError) {
      return error.isOperational;
    } else {
      return false;
    }
  }
}

const ErrorHandler = async (err, req, res, next) => {
  const errorLogger = new ErrorLogger();

  process.on("uncaughtException", (reason, promise) => {
    console.log(reason, "UNHANDLED");
    throw reason; // need to take care
  });

  process.on("uncaughtException", (error) => {
    errorLogger.logError(error);
    if (errorLogger.isTrustError(err)) {
      //process exist // need restart
    }
  });

  if (err) {
    await errorLogger.logError(err);
    if (errorLogger.isTrustError(err)) {
      if (err.errorStack) {
        const errorDescription = err.errorStack;
        return res.status(err.statusCode).json({ message:err });
      }
      return res.status(err.statusCode).json({ e: err });
    } else {
      return res.status(err.statusCode).json({ message: err });
      //process exit // terriablly wrong with flow need restart
    }
    return res.status(err.statusCode).json({ message: err });
  }
  next();
};

module.exports = ErrorHandler;
