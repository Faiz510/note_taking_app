import User from "../modal/UserModal.js";
import catchAsync from "../utilis/CatchAsync.js";
import AppError from "../utilis/AppError.js";
import jwt from "jsonwebtoken";
import sendSucessResponse from "../utilis/SendResponse.js";
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

  if (!email || !password)
    return next(new AppError(400, "plz enter all fields"));

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new AppError(400, "invalid email"));

  // if exists then verify password
  const correctPassword = await user.correctPassword(password, user.password);
  if (!correctPassword)
    return next(
      new AppError(400, "invalid password . entered correct password")
    );

  // send jwt token response
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  // sending response
  await sendSucessResponse(res, user, token);
});

export const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    return next(new AppError(400, "your are not logged in or invalid token"));

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // console.log(decoded);

  const currentUser = await User.findById(decoded.userId);

  if (!currentUser) return next(new AppError(400, "invalid token"));

  req.user = currentUser;
  // console.log(req.user);

  next();
});
