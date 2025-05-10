import express, { Request, Response } from "express";
import { SignInTypes, SignUpTypes } from "@repo/types/types";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { middleware } from "./middleware";
import prisma from "@repo/db/db";

const app = express();
const PORT = 5000;

app.post("/signup", async (req: Request, res: Response): Promise<any> => {
  const result = SignUpTypes.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ message: result.error.message });
  }

  const hashedPassword = await hash(result.data.password, 5);

  try {
    await prisma.user.create({
      data: {
        ...result.data,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: "user signup successful" });
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/signin", async (req: Request, res: Response): Promise<any> => {
  const result = SignInTypes.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ message: result.error.message });
  }

  const isUserExist = await prisma.user.findUnique({
    where: {
      email: result.data.email,
    },
  });

  if (!isUserExist) {
    return res
      .status(400)
      .json({ message: "user not found please signup first" });
  }

  const isPasswordCorrect = await compare(
    result.data.password,
    isUserExist.password
  );

  if (!isPasswordCorrect) {
    return res.json({ message: "wrong password" }).status(400);
  }

  const token = sign(
    { userId: isUserExist.id, userEmail: isUserExist.email },
    process.env.JWT_SECRET!
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return res.json({ message: "user signin successfull" }).status(201);
});

app.post(
  "/create-room",
  middleware,
  async (req: Request, res: Response): Promise<any> => {}
);

app.listen(PORT, () => console.log("server is running on PORT: " + PORT));
