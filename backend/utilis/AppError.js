class AppError extends Error {
  constructor(statusCode, message) {
    super(message);

    this.statusCode = statusCode || 500;

    this.status = statusCode.toString().startsWith("4") ? "fail" : "sucess";

    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
