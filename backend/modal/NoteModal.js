import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: false,
      required: [true, "title is required"],
      maxlength: [20, "A title should be less than 12 character"],
      minlength: [6, "A title should be more than 12 character"],
    },

    note: {
      type: String,
      required: [true, "A note is required"],
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
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

// NoteSchema.pre(/^find/, function () {
//   this.populate({
//     path: "category",
//     select: "categoryName",
//   });
// });

const Note = mongoose.model("Note", NoteSchema);

export default Note;
