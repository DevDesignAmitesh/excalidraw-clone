import { verify } from "jsonwebtoken";
import { WebSocket, WebSocketServer } from "ws";
import { JWT_SECRET } from "@repo/types/types";

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

const checkUserAuth = (
  token: string
): null | { userId: string; userEmail: string } => {
  const decoded = verify(token, JWT_SECRET!) as {
    userId: string;
    userEmail: string;
  };

  if (!decoded.userEmail || !decoded.userId) {
    return null;
  }
  return decoded;
};

// null | {userId: string userEmail: string}

interface User {
  userId: string;
  rooms: string[];
  ws: WebSocket;
}

const users: User[] = [];

wss.on("connection", async (ws, req) => {
  const url = req.url;
  if (!url) {
    ws.close();
    return;
  }

  const queryParam = new URLSearchParams(url.split("?")[1]);
  const token = queryParam.get("token");

  if (!token) {
    return ws.close();
  }

  const user = checkUserAuth(token);

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

  ws.on("message", (e) => {
    if (typeof e.toString() === "string") {
      ws.close();
      return;
    }

    const parsedMessage = JSON.parse(e.toString());

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
