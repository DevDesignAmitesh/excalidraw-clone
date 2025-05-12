import express, { Request, Response } from "express";
import {
  JWT_SECRET,
  SignInTypes,
  SignUpTypes,
  CreateRoomTypes,
} from "@repo/types/types";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { middleware } from "./middleware";
import { prisma } from "@repo/db/db";
import { config } from "dotenv";
import cors from "cors";

const app = express();
const PORT = 5000;
console.log(JWT_SECRET);

app.use(express.json());
app.use(cors());

app.post("/signup", async (req: Request, res: Response): Promise<any> => {
  try {
    const result = SignUpTypes.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ message: result.error.message });
    }

    const hashedPassword = await hash(result.data.password, 5);

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
  try {
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

    const token = sign({ userId: isUserExist.id }, JWT_SECRET!);

    return res.json({ message: "user signin successfull", token }).status(201);
  } catch (error) {
    console.error(error as Error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post(
  "/create-room",
  middleware,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const adminId = (req as any).user.userId;
      const result = CreateRoomTypes.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({ message: result.error.message });
      }

      const newRoom = await prisma.room.create({
        data: {
          ...result.data,
          adminId,
        },
      });

      return res.json({
        message: "room created successfully",
        roomId: newRoom.id,
      });
    } catch (error) {
      console.error((error as Error).message);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

app.get("/chats/:roomId", async (req: Request, res: Response): Promise<any> => {
  try {
    const roomId = Number(req.params.roomId);
    console.log("hello in the backend ", roomId);

    if (!roomId) {
      return res.json({ message: "room id not found" }).status(404);
    }

    console.log("oh yeaahh");

    const chats = await prisma.chat.findMany({
      where: {
        roomId,
      },
      orderBy: {
        id: "desc",
      },
      take: 50,
    });

    console.log(chats);

    return res.json({ message: "chats found", chat: chats }).status(201);
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => console.log("server is running on PORT: " + PORT));
