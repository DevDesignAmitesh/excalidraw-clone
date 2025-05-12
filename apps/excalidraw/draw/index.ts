import { BACKEND_URL } from "@/config";
import axios from "axios";

type Shapes =
  | {
      type: "rect";
      width: number;
      height: number;
      x: number;
      y: number;
    }
  | {
      type: "circle";
      radius: number;
      x: number;
      y: number;
    };

const existingShapes: Shapes[] = [];

export const drawInit = (
  canvas: HTMLCanvasElement,
  type: "rect" | "circle",
  socket: WebSocket
): (() => void) | void => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      const shapes = JSON.parse(data.message);
      const finalShape = shapes.shape;
      console.log(shapes);
      console.log(finalShape);
      if (finalShape.type === "rect") {
        existingShapes.push({
          type: finalShape.type,
          width: finalShape.width,
          height: finalShape.height,
          x: finalShape.x,
          y: finalShape.y,
        });
      } else if (finalShape.type === "circle") {
        existingShapes.push({
          type: finalShape.type,
          radius: finalShape.radius,
          x: finalShape.x,
          y: finalShape.y,
        });
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#121212";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawAllShapes();
    } catch (err) {
      console.error("❌ Failed to parse WebSocket message:", err);
    }
  };

  const drawAllShapes = () => {
    existingShapes.map((shape) => {
      ctx.beginPath();
      ctx.strokeStyle = "#fff";
      if (shape.type === "rect") {
        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      }
      if (shape.type === "circle") {
        ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
        ctx.stroke();
      }
    });
  };

  const getAllShapes = async (): Promise<void> => {
    try {
      const res = await axios.get(`${BACKEND_URL}/chats/1`);
      console.log("✅ hello");
      const chatData = res.data.chat; // array of messages

      chatData.forEach((entry: any) => {
        try {
          const parsed = JSON.parse(entry.message); // parses '{"shape":{...}}'
          const shape: Shapes = parsed.shape;

          if (shape.type === "rect" || shape.type === "circle") {
            existingShapes.push(shape);
          }
        } catch (err) {
          console.error("❌ Failed to parse shape:", err);
        }
      });

      drawAllShapes();

      console.log("🎯 Final shapes array:", existingShapes);
    } catch (err) {
      console.error("❌ Error fetching shapes:", err);
    }
  };

  getAllShapes();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#121212";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawAllShapes();

  let clicked = false;
  let startX = 0;
  let startY = 0;

  const handleMouseDown = (e: MouseEvent) => {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;
  };

  const handleMouseUp = (e: MouseEvent) => {
    clicked = false;
    const width = e.clientX - startX;
    const height = e.clientY - startY;
    const radius = Math.sqrt(
      Math.pow(e.clientX - startX, 2) + Math.pow(e.clientY - startY, 2)
    );

    if (type === "rect") {
      const shape: Shapes = {
        type: "rect",
        width,
        height,
        x: startX,
        y: startY,
      };

      existingShapes.push(shape);

      socket?.send(
        JSON.stringify({
          type: "chat",
          message: JSON.stringify({ shape }),
          roomId: 1,
        })
      );
    } else if (type === "circle") {
      const shape: Shapes = {
        type: "circle",
        radius,
        x: startX,
        y: startY,
      };
      existingShapes.push(shape);

      socket.send(
        JSON.stringify({
          type: "chat",
          message: JSON.stringify({ shape }),
          roomId: 1,
        })
      );
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawAllShapes();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!clicked) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawAllShapes();

    ctx.beginPath();
    ctx.strokeStyle = "#fff";

    if (type === "rect") {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      ctx.strokeRect(startX, startY, width, height);
    }

    if (type === "circle") {
      const radius = Math.sqrt(
        Math.pow(e.clientX - startX, 2) + Math.pow(e.clientY - startY, 2)
      );
      ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
      ctx.stroke();
    }
  };

  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mousemove", handleMouseMove);

  return () => {
    canvas.removeEventListener("mousedown", handleMouseDown);
    canvas.removeEventListener("mouseup", handleMouseUp);
    canvas.removeEventListener("mousemove", handleMouseMove);
  };
};
