import express from "express";

import { protect } from "../controller/authController.js";
import {
  categoryById,
  createCategory,
  getAllCategory,
  delCategory,
  updateCategory,
} from "../controller/categoryController.js";

const router = express.Router();

router.route("/").post(protect, createCategory).get(protect, getAllCategory);

router
  .route("/:id")
  .get(protect, categoryById)
  .delete(protect, delCategory)
  .put(protect, updateCategory);
export default router;
