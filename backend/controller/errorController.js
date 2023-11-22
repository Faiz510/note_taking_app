export const globalErrorHandler = (err, req, res, next) => {
  err.status = err.status || "fail";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    // Error: err,
    message: err.message,
    // stack: err.stack,
  });
};
