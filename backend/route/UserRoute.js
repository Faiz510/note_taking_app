import express from "express";
import { signup, login, protect } from "../controller/authController.js";
import { deleteMe, updateMe } from "../controller/userController.js";

const router = express.Router();
////////////////

router.route("/signup").post(signup);
router.route("/login").post(login);

router.route("/deleteMe").delete(protect, deleteMe);

router.route("/updateMe").put(protect, updateMe);

export default router;
