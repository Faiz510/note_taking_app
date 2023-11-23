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
