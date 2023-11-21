import express from "express";
import { AllNotes, createNote } from "../controller/NoteController.js";

const router = express.Router();

router.route("/").post(createNote).get(AllNotes);

export default router;
