import Note from "../modal/NoteModal.js";
import catchAsync from "../utilis/CatchAsync.js";
import AppError from "../utilis/AppError.js";
import User from "../modal/UserModal.js";

export const updateNote = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, note } = req.body;
  const { token } = req.body;

  const newBody = {
    title,
    note,
  };

  const notes = await Note.findByIdAndUpdate(id, newBody, {
    new: true,
    runValidators: true,
  });

  if (!notes) return next(new AppError(400, "note cant found with this id"));

  res.status(200).json({
    status: "sucess",
    token,
    notes,
  });
});

export const createNote = catchAsync(async (req, res, next) => {
  const { token } = req.body;
  // validate fields
  const { title, note } = req.body;
  if (
    !title ||
    !note ||
    title.trim().length === 0 ||
    note.trim().length === 0
  ) {
    return next(new AppError(400, "enter all fields"));
  }
  const newNote = {
    title,
    note,
  };
  // create note
  const UserNote = await Note.create(newNote);
  // geting user functionality
  const user = await User.findById(req.user.id);
  if (!user)
    return next(
      new AppError(200, "A user id is required or user is not logged in")
    );
  user.notes.push(UserNote);
  await user.save({ validateBeforeSave: false });
  ///////////////////////////
  res.status(200).json({
    status: "sucess",
    token,
    user,
  });
});

export const AllNotes = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const notes = await user.notes;

  if (!user || !notes) {
    return next(new AppError(200, "user not logged in or notes nof found"));
  }
  res.status(200).json({
    status: "sucess",
    notesNum: notes.length,
    notes,
  });
});

export const noteById = catchAsync(async (req, res, next) => {
  const notes = await Note.findById(req.params.id);

  if (!notes) return next(new AppError(400, "note not found with this id"));

  res.status(200).json({
    status: "sucess",
    notes,
  });
});

export const deleteNote = catchAsync(async (req, res, next) => {
  const { token } = req.body;
  // user
  const user = await User.findById(req.user.id);
  if (!user)
    return next(
      new AppError(200, "A user id is required or user is not logged in")
    );

  // Usernote.pull

  // notes del from notes modal
  const notes = await Note.findByIdAndDelete(req.params.id);
  if (!notes) return next(new AppError(400, "cant found note with this id "));

  // also remove from notes array

  const userUpdate = await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { notes: req.params.id } },
    { new: true }
  );

  res.status(200).json({
    status: "sucess",
    token,
    user: userUpdate,
  });
});
