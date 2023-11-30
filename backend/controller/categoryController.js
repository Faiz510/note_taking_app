import Category from "../modal/Category.js";
import catchAsync from "../utilis/CatchAsync.js";
import AppError from "../utilis/AppError.js";
import User from "../modal/UserModal.js";
import sendSucessResponse from "../utilis/SendResponse.js";
import ErrorHandlerFunction from "../utilis/ErrorHandlerFunction.js";

export const createCategory = catchAsync(async (req, res, next) => {
  const { token } = req.body;
  const category = await Category.create(req.body);

  //   geting user to add category in it
  const user = await User.findById(req.user.id);

  ErrorHandlerFunction(
    user,
    next,
    400,
    "user is not logged or user not found with this id "
  );

  await user.categories.push(category);
  await user.save({ validateBeforeSave: false });

  //   send response
  sendSucessResponse(res, user, token);
});

export const getAllCategory = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const category = await user.categories;

  res.status(200).json({
    status: "sucess",
    categoryNum: category.length,
    category,
  });
});
