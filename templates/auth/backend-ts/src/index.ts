import express from "express";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.routes.js";
import { requireAuth } from "./middleware/auth.middleware.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (_, res) => {
  res.send("🚀 Backend TS running");
});

app.use("/api/auth", authRouter);

app.get("/api/protected", requireAuth, (req, res) => {
  res.json({ ok: true, userId: req.userId });
});

const port = Number(process.env.PORT ?? "5000");
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

