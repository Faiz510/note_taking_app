import User from "../modal/UserModal.js";
import catchAsync from "../utilis/CatchAsync.js";
import sendSucessResponse from "../utilis/SendResponse.js";
import ErrorHandlerFunction from "../utilis/ErrorHandlerFunction.js";
import multer from "multer";
import AppError from "../utilis/AppError.js";

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/img");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];

    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError(400, "file is not a image"), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const multerUserPhoto = upload.single("photo");

export const updateMe = catchAsync(async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  // const photo =
  const { username, email, token, photo } = req.body;

  const newBody = {
    username,
    email,
    photo,
  };

  if (req.file) {
    newBody.photo = req.file.filename;
  }

  const user = await User.findByIdAndUpdate(req.user.id, newBody, {
    new: true,
    runValidators: true,
  });

  ErrorHandlerFunction(
    user,
    next,
    400,
    "user not found with this id or You are not login"
  );

  // sending response
  await sendSucessResponse(res, user, token);
});

export const deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.user.id);

  ErrorHandlerFunction(
    user,
    next,
    400,
    "user cant found with this id or user not login"
  );

  // sending response
  await sendSucessResponse(res);
});
