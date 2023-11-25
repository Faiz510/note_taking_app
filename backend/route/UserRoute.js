import express from "express";
import { signup, login, protect } from "../controller/authController.js";
import {
  GetNoteById,
  createUserNote,
  deleteMe,
  deleteNoteById,
  getAlluserNotes,
  updateMe,
  updateNote,
} from "../controller/userController.js";

const router = express.Router();
////////////////

router.route("/signup").post(signup);
router.route("/login").post(login);

router.route("/add-note").post(protect, createUserNote);

router.route("/deleteMe").delete(protect, deleteMe);

router.route("/updateMe").put(protect, updateMe);

router.route("/notes").get(protect, getAlluserNotes);

router
  .route("/note/:id")
  .get(protect, GetNoteById)
  .delete(protect, deleteNoteById)
  .put(protect, updateNote);

export default router;
