import { JwtPayload, verify } from "jsonwebtoken";
import { WebSocket, WebSocketServer } from "ws";
import { JWT_SECRET } from "@repo/types/types";
import { prisma } from "@repo/db/db";
import { config } from "dotenv";

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

console.log(JWT_SECRET);

const checkUserAuth = (token: string): null | JwtPayload => {
  console.log(JWT_SECRET);
  const decoded = verify(token, JWT_SECRET) as JwtPayload;
  console.log("decoded", decoded);
  if (!decoded.userId) {
    return null;
  }
  return decoded;
};

interface User {
  userId: string;
  rooms: number[];
  ws: WebSocket;
}

const users: User[] = [];

wss.on("connection", async (ws, req) => {
  const url = req.url;
  console.log("url", url);
  if (!url) {
    ws.close();
    return;
  }

  const queryParam = new URLSearchParams(url.split("?")[1]);
  const token = queryParam.get("token");
  console.log("token", token);

  if (!token) {
    return ws.close();
  }

  const user = checkUserAuth(token);

  console.log("user", user);

  if (!user) {
    ws.close();
    return;
  }

  users.push({
    userId: user.userId,
    rooms: [],
    ws,
  });

  ws.on("error", (e) => console.log(e));

  ws.on("message", async (e) => {
    const parsedMessage = JSON.parse(e.toString());

    console.log("parsedMessage", parsedMessage);

    if (parsedMessage.type === "join_room") {
      const user = users.find((x) => x.ws === ws);
      user?.rooms.push(parsedMessage.roomId);
    }

    if (parsedMessage.type === "leave_room") {
      const user = users.find((x) => x.ws === ws);
      if (!user) {
        return;
      }
      user.rooms = user?.rooms.filter((x) => x !== parsedMessage.roomId);
    }

    if (parsedMessage.type === "chat") {
      const { message, roomId } = parsedMessage;

      await prisma.chat.create({
        data: {
          message,
          roomId: Number(roomId),
          userId: user.userId,
        },
      });
      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message,
              roomId,
            })
          );
        }
      });
    }
  });
});
