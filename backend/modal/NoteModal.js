import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "title is required"],
      maxlength: [20, "A title should be less than 12 character"],
      minlength: [6, "A title should be more than 12 character"],
    },

    note: {
      type: String,
      required: [true, "A note is required"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", NoteSchema);

export default Note;
