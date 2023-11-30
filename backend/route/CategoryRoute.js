import express from "express";
import { protect } from "../controller/authController.js";
import {
  createCategory,
  getAllCategory,
} from "../controller/categoryController.js";

const router = express.Router();

router.route("/").post(protect, createCategory).get(protect, getAllCategory);

export default router;
