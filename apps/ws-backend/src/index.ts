import { verify } from "jsonwebtoken";
import { WebSocketServer } from "ws";
import { JWT_SECRET } from "@repo/types/types";

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

interface User {
  roomId: string;

}

const clients = []

wss.on("connection", async (ws, req) => {
  const url = req.url;
  if (!url) {
    ws.close();
    return;
  }

  const queryParam = new URLSearchParams(url.split("?")[1]);
  const token = queryParam.get("token");

  if (!token) {
    ws.close();
    return;
  }

  const decoded = verify(token, JWT_SECRET!) as {
    userId: string;
    userEmail: string;
  };

  if (!decoded.userEmail || !decoded.userId) {
    ws.close();
    return;
  }
  ws.on("error", (e) => console.log(e));

  ws.on("message", (e) => {
    if (typeof e.toString() === "string") {
      ws.close();
      return;
    }

    const parsedMessage = JSON.parse(e.toString());

    if (parsedMessage.type === "JOIN") {
    }

    if (parsedMessage.type === "CREATE") {
    }

    if (parsedMessage.type === "CHAT") {
    }
  });

  ws.send("hello in the starting");
});
