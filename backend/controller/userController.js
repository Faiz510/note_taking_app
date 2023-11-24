import User from "../modal/UserModal.js";
import catchAsync from "../utilis/CatchAsync.js";
import AppError from "../utilis/AppError.js";

export const createUserNote = catchAsync(async (req, res, next) => {
  const { enteredTitle, enteredNote } = req.body;

  const noteBody = {
    title: enteredTitle,
    note: enteredNote,
  };

  const user = await req.user;

  if (!user) return next(400, "login in to add notes");

  user.notes.push(noteBody);

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "sucess",
    user,
  });
});

export const deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.user.id);

  if (!user)
    return next(
      new AppError(400, "user cant found with this id or user not login")
    );

  res.status(200).json({
    status: "sucess",
    user: null,
  });
});

export const updateMe = catchAsync(async (req, res, next) => {
  const { username, email, token } = req.body;

  const newBody = {
    username,
    email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newBody, {
    new: true,
    runValidators: true,
  });

  if (!user)
    return next(
      new AppError(400, "user not found with this id or You are not login")
    );

  res.status(200).json({
    status: "sucess",
    token,
    user,
  });
});
