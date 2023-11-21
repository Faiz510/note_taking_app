import express from "express";
import cors from "cors";
import morgan from "morgan";
import NoteRouter from "./route/NoteRoute.js";

////////////////////////
const app = express();

///////////////
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

///////////////////
app.use("/api/v1/note", NoteRouter);

export default app;
