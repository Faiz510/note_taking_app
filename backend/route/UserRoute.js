import express from "express";
import { signup } from "../controller/authController";

const router = express.Router();
////////////////

router.route("/").post(signup);

export default router;
