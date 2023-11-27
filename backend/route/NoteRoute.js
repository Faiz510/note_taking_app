import express from "express";
import {
  AllNotes,
  createNote,
  deleteNote,
  noteById,
  updateNote,
} from "../controller/NoteController.js";
import { protect } from "../controller/authController.js";

const router = express.Router();

router.route("/").post(protect, createNote).get(protect, AllNotes);

router.route("/:id").delete(deleteNote).get(noteById).put(updateNote);

export default router;
