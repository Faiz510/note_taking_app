import express from "express";

import { protect } from "../controller/authController.js";
import { createCategory } from "../controller/categoryController.js";

const router = express.Router();

router.route("/").post(protect, createCategory);

export default router;
