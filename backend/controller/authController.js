import User from "../modal/UserModal.js";
import catchAsync from "../utilis/CatchAsync.js";
import AppError from "../utilis/AppError.js";
import jwt from "jsonwebtoken";

// signup
export const signup = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(200).json({
    status: "sucess",
    user,
  });
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

  //   console.log(user);
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.status(200).json({
    status: "sucess",
    token,
    message: `token has send to ${user.username}`,
  });
});
