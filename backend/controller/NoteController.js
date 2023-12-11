import Note from "../modal/NoteModal.js";
import catchAsync from "../utilis/CatchAsync.js";
import AppError from "../utilis/AppError.js";
import User from "../modal/UserModal.js";
import sendSucessResponse from "../utilis/SendResponse.js";
import ErrorHandlerFunction from "../utilis/ErrorHandlerFunction.js";
import Category from "../modal/CategoryModal.js";

export const createNote = catchAsync(async (req, res, next) => {
  // validate fields
  const { title, note, token, category } = req.body;
  if (
    !title ||
    !note ||
    title.trim().length === 0 ||
    note.trim().length === 0
  ) {
    return next(new AppError(400, "enter all fields"));
  }
  if (!category || category.trim().length === 0)
    return next(new AppError(400, "category not added"));
  const newNote = {
    title,
    note,
    category,
  };
  /////////////////////
  // create note
  const UserNote = await Note.create(newNote);

  // getting category id
  const UserCategory = await Category.findById(category);
  ErrorHandlerFunction(
    UserCategory,
    next,
    400,
    "cannot find category with with this id"
  );

  // pushing notes in categories
  UserCategory.notes.push(UserNote);
  await UserCategory.save({ validateBeforeSave: false });

  // getting user for respose
  const user = await User.findById(req.user.id);
  ErrorHandlerFunction(
    user,
    next,
    400,
    "A user id is required or user is not logged in"
  );
  ///////////////////////////
  // sending response
  await sendSucessResponse(res, user, token);
});

export const noteById = catchAsync(async (req, res, next) => {
  const notes = await Note.findById(req.params.id).populate({
    path: "category",
    select: "categoryName",
  });

  if (!notes) return next(new AppError(400, "note not found with this id"));

  res.status(200).json({
    status: "sucess",
    notes,
  });
});

export const AllNotesByCat = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const category = await Category.findById(req.body.catId);

  const notes = category.notes;

  if (!user || !notes) {
    return next(new AppError(200, "user not logged in or notes nof found"));
  }
  res.status(200).json({
    status: "sucess",
    notesNum: notes.length,
    notes,
  });
});

export const deleteNote = catchAsync(async (req, res, next) => {
  const { token } = req.body;

  // notes del from notes modal
  const notes = await Note.findByIdAndDelete(req.params.id);

  ErrorHandlerFunction(notes, next, 400, "can not found note with this id");

  // user
  const user = await User.findById(req.user.id);

  ErrorHandlerFunction(
    user,
    next,
    400,
    "A user id is required or user is not logged in"
  );

  res.status(200).json({
    status: "sucess",
    token,
    // user: userUpdate,
    user,
  });
});

/////////////////////////////
// update note
export const updateNote = catchAsync(async (req, res, next) => {
  const { title, note, category, token } = req.body;

  const newBody = {
    title,
    note,
    category,
  };

  // get previous Cat
  const UserNote = await Note.findById(req.params.id);
  const preCategoryId = UserNote.category._id;
  // get prvious categro and remove form note from prevouse categroy
  const preCategory = await Category.findByIdAndUpdate(
    preCategoryId,
    { $pull: { notes: req.params.id } },
    { new: true }
  );

  const notes = await Note.findByIdAndUpdate(req.params.id, newBody, {
    new: true,
    runValidators: true,
  });
  ErrorHandlerFunction(notes, next, 400, "note can not found with this id");

  // add note to existing category
  const newCategory = await Category.findByIdAndUpdate(category, {
    $addToSet: { notes: notes },
  });

  // getting user in response
  const user = await User.findById(req.user.id);
  ErrorHandlerFunction(
    user,
    next,
    400,
    "A user id is required or user is not logged in"
  );

  // sending response
  await sendSucessResponse(res, user, token);
});
