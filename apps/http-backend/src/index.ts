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
import { nanoid } from "nanoid";
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

      const uniqueId = nanoid(8);
      const finalSlug = `${result.data.slug}-${uniqueId}`;

      const newRoom = await prisma.room.create({
        data: {
          name: result.data.name,
          slug: finalSlug,
          adminId,
        },
      });
      return res.json({
        message: "room created successfully",
        roomSlug: newRoom.slug,
      });
    } catch (error) {
      console.error((error as Error).message);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

app.get(
  "/chats/:roomSlug",
  async (req: Request, res: Response): Promise<any> => {
    try {
      console.log(req.params.roomSlug);
      const roomSlug = req.params.roomSlug;

      if (!roomSlug) {
        return res.json({ message: "room id not found" }).status(404);
      }

      const room = await prisma.room.findUnique({
        where: { slug: roomSlug },
        include: {
          chats: {
            orderBy: {
              id: "desc",
            },
            take: 100,
          },
        },
      });

      if (!room) {
        return res.json({ message: "room not found" }).status(404);
      }

      const chats = room.chats;

      return res.json({ message: "chats found", chat: chats }).status(201);
    } catch (error) {
      console.error((error as Error).message);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

app.get("/rooms", middleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = (req as any).user.userId;

    const rooms = await prisma.room.findMany({
      where: { adminId: userId },
    });
    return res.json({ message: "rooms found", rooms }).status(201);
  } catch (error) {
    console.error((error as Error).message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => console.log("server is running on PORT: " + PORT));
