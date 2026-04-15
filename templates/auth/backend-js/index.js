import express from "express";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.routes.js";
import { requireAuth } from "./middleware/auth.middleware.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Backend running");
});

app.use("/api/auth", authRouter);

app.get("/api/protected", requireAuth, (req, res) => {
  res.json({ ok: true, userId: req.userId });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

