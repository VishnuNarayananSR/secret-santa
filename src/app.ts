import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import { PORT } from "./constants";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
