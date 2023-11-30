import Note from "../modal/NoteModal.js";
import catchAsync from "../utilis/CatchAsync.js";
import AppError from "../utilis/AppError.js";
import User from "../modal/UserModal.js";
import sendSucessResponse from "../utilis/SendResponse.js";
import ErrorHandlerFunction from "../utilis/ErrorHandlerFunction.js";
import Category from "../modal/CategoryModal.js";

export const createCategory = catchAsync(async (req, res, next) => {
  const { token } = req.body;
  const category = await Category.create(req.body);

  const user = await User.findById(req.user.id);

  ErrorHandlerFunction(
    user,
    next,
    400,
    "user not logged or user not found with this id "
  );

  user.categories.push(category);
  await user.save({ validateBeforeSave: false });

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

export const categoryById = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  res.status(200).json({
    status: "sucess",
    category,
  });
});

export const delCategory = catchAsync(async (req, res, next) => {
  const { token } = req.body;
  const category = await Category.findByIdAndDelete(req.params.id);

  ErrorHandlerFunction(category, next, 400, "category not found with this id");

  const user = await User.findById(req.user.id);

  ErrorHandlerFunction(
    user,
    next,
    400,
    "user not logged in or user not found with id "
  );

  sendSucessResponse(res, user, token);
});

export const updateCategory = catchAsync(async (req, res, next) => {
  const { token } = req.body;
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  ErrorHandlerFunction(category, next, 400, "category not found with this id");

  const user = await User.findById(req.user.id);

  ErrorHandlerFunction(
    user,
    next,
    400,
    "user not logged in or user not found with id "
  );

  sendSucessResponse(res, user, token);
});
