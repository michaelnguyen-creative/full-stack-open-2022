import express from "express";
const app = express();
const PORT = 4000;

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
