import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "A categroy must have name "],
    maxlength: [20, "Category must have less than 20 character"],
    minlength: [4, "Category must have more than 4 character"],
  },
  categoryDescription: {
    type: String,
    required: [true, "A categroy must have description"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Category = mongoose.model("Category", CategorySchema);

export default Category;
