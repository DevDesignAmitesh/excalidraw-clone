import express, { Request, Response } from "express";

const app = express();
const PORT = 5000;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "healthy server" });
});

app.listen(PORT, () => console.log("server is running on PORT: " + PORT));
