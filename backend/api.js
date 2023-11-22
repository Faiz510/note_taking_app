import express from "express";
import cors from "cors";
import morgan from "morgan";
import NoteRouter from "./route/NoteRoute.js";
import AppError from "./utilis/AppError.js";
import { globalErrorHandler } from "./controller/errorController.js";

////////////////////////
const app = express();

///////////////
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

///////////////////
app.use("/api/v1/note", NoteRouter);

//////////////////
app.all("*", (req, res, next) =>
  next(new AppError(400, `can't found the route ${req.originalUrl}`))
);
app.use(globalErrorHandler);
///////

export default app;
