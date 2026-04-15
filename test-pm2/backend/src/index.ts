import express from "express";

const app = express();

app.get("/", (_, res) => {
  res.send("🚀 Backend TS running");
});

app.listen(5000, () => {
  console.log("Server running on 5000");
});

