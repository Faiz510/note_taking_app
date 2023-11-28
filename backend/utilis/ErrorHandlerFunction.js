import AppError from "./AppError.js";

const ErrorHandlerFunction = (user, next, statuscode, message) => {
  if (!user) return next(new AppError(statuscode, `${message}`));
};

export default ErrorHandlerFunction;
