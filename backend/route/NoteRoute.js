import express from "express";
import {
  AllNotesByCat,
  createNote,
  deleteNote,
  noteById,
  updateNote,
} from "../controller/NoteController.js";
import { protect } from "../controller/authController.js";

const router = express.Router();

router.route("/").post(protect, createNote).get(protect, AllNotesByCat);

router
  .route("/:id")
  .delete(protect, deleteNote)
  .get(protect, noteById)
  .put(protect, updateNote);

export default router;
