const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORISED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};
class AppError extends Error {
  constructor(
    message="this will hapen",
    statusCode,
    isOperational,
    errorStack=true,
    logingErrorResponse
  ) {
    // super();
    super(message, statusCode, isOperational, errorStack);
    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    this.logError = logingErrorResponse;
    Error.captureStackTrace(this);
  }
}

//api Specific Errors
class APIError extends AppError {
  constructor(
    message="Internal ma vandho",
    statusCode = STATUS_CODES.INTERNAL_ERROR,
    isOperational = true
  ) {
    super(message, statusCode, isOperational);
  }
}

//400
class BadRequestError extends AppError {
  constructor(message = "Bad request", logingErrorResponse) {
    super(
      "NOT FOund",
      STATUS_CODES.BAD_REQUEST,
      true,
      false,
      logingErrorResponse
    );
  }
}

//400
class ValidationError extends AppError {
  constructor(message = "Validation Error", errorStack) {
    super(
      "Validation Ka Issue",
      STATUS_CODES.BAD_REQUEST,
      true,
      errorStack
    );
  }
}
 
class general extends AppError {
  constructor(
    message ,
    statusCode,
    errorStack,
    isOperational = true
  ) {
    super(
      message,
      statusCode ,
      errorStack,
      isOperational
    );
  }
}

 class AuthError extends AppError{
    constructor(message = "You Don't Have Access To This Route",statusCode,errorStack,isOperational=true){
        super(
          message,
          statusCode = STATUS_CODES.UN_AUTHORISED,
          errorStack,
          isOperational
        );
    }
 }

module.exports = {
  AppError,
  APIError,
  BadRequestError,
  ValidationError,
  STATUS_CODES,
  AuthError,
  general
};
