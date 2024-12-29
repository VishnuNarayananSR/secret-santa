import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import groupRoutes from "./routes/groupRoutes";
import participantRoutes from "./routes/participantRoutes";
import { PORT } from "./constants";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  express.static(path.join(__dirname, "..", "frontend", "dist"), {
    maxAge: "1y",
    immutable: true,
    setHeaders: (res, path) => {
      if (path.endsWith(".html")) {
        res.setHeader("Cache-control", "no-cache, must-revalidate");
      }
    },
  })
);

app.use("/api/groups", groupRoutes);
app.use("/api/participants", participantRoutes);

app.get("/*", function (req, res) {
  res.setHeader("Cache-control", "no-cache, must-revalidate");
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});

connectDB();
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
