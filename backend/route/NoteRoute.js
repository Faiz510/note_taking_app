import express from "express";
import {
  AllNotes,
  createNote,
  deleteNote,
  noteById,
  updateNote,
} from "../controller/NoteController.js";

const router = express.Router();

router.route("/").post(createNote).get(AllNotes);
router.route("/:id").delete(deleteNote).get(noteById).put(updateNote);

export default router;
