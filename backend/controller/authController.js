import User from "../modal/UserModal.js";
import catchAsync from "../utilis/CatchAsync.js";
import jwt from "jsonwebtoken";
import sendSucessResponse from "../utilis/SendResponse.js";
import ErrorHandlerFunction from "../utilis/ErrorHandlerFunction.js";

// signup
export const signup = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  // sending response
  await sendSucessResponse(res, user);
});
//////////////////////

//login
export const login = catchAsync(async (req, res, next) => {
  // user with email
  const { email, password } = req.body;

  ErrorHandlerFunction(email, next, 400, "enter email");
  ErrorHandlerFunction(password, next, 400, "enter password");

  const user = await User.findOne({ email }).select("+password");

  // if use not correct
  ErrorHandlerFunction(user, next, 400, "Invalid email or password");

  // if exists then verify password is password is correct
  const correctPassword = await user.correctPassword(password, user.password);

  // if password not correct
  ErrorHandlerFunction(correctPassword, next, 400, "enter correct password");

  // send jwt token response
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // sending response
  await sendSucessResponse(res, user, token);
});

// protect
export const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  ErrorHandlerFunction(
    token,
    next,
    400,
    "your are not logged in or invalid token"
  );

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.userId);

  ErrorHandlerFunction(currentUser, next, 400, "invalid token");

  req.user = currentUser;

  next();
});
