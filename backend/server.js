import app from "./api.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
////////////
dotenv.config();

const port = process.env.PORT;
const DB = process.env.DB;

mongoose.connect(DB).then(() => console.log("app connected to database"));

app.listen(port, () => {
  console.log(`app is listen to port ${port}`);
});
