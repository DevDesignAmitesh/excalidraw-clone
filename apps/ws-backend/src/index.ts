import { WebSocketServer } from "ws";

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (ws) => {
  ws.on("error", (e) => console.log(e));

  ws.on("message", (e) => {
    console.log(e.toString());
  });

  ws.send("hello in the starting");
});
