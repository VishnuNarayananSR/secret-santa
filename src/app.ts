import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import groupRoutes from "./routes/groupRoutes";
import { PORT } from "./constants";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/groups", groupRoutes);

connectDB();
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
