import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
