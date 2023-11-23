import express from "express";
import { signup, login, protect } from "../controller/authController.js";
import { createUserNote } from "../controller/userController.js";

const router = express.Router();
////////////////

router.route("/signup").post(signup);
router.route("/login").post(login);

router.route("/add-note").post(protect, createUserNote);

export default router;
