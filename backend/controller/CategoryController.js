import Note from "../modal/NoteModal.js";
import catchAsync from "../utilis/CatchAsync.js";
import AppError from "../utilis/AppError.js";
import User from "../modal/UserModal.js";
import sendSucessResponse from "../utilis/SendResponse.js";
import ErrorHandlerFunction from "../utilis/ErrorHandlerFunction.js";
import Category from "../modal/CategoryModal.js";

export const createCategory = catchAsync(async (req, res, next) => {
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

  sendSucessResponse(res, user);
});
