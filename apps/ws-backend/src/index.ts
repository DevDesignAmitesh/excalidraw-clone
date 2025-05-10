import { verify } from "jsonwebtoken";
import { WebSocket, WebSocketServer } from "ws";

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

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

  const decoded = verify(token, process.env.JWT_SECRET!) as {
    userId: string;
    userEmail: string;
  };

  if (!decoded.userEmail || !decoded.userId) {
    ws.close();
    return;
  }
  ws.on("error", (e) => console.log(e));

  ws.on("message", (e) => {
    console.log(e.toString());
  });

  ws.send("hello in the starting");
});
