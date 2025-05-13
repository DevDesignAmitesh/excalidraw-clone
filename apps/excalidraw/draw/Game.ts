import { getAllShapes } from "./http";

export type Tools = "rect" | "circle" | "line";

export type Shapes =
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
    }
  | { type: "line"; x1: number; y1: number; x2: number; y2: number };

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: Shapes[];
  private socket: WebSocket;
  private roomId: string;
  public clicked: boolean;
  public startX: number;
  public startY: number;
  public selectedTool: Tools;

  constructor(canvas: HTMLCanvasElement, socket: WebSocket, roomId: string) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.init();
    this.initHandlers();
    this.initMouseHandlers();
    this.existingShapes = [];
    this.roomId = roomId;
    this.socket = socket;
    this.clicked = false;
    this.startX = 0;
    this.startY = 0;
    this.selectedTool = "rect";
  }

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "#121212";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  async init() {
    this.existingShapes = (await getAllShapes(this.roomId)) ?? [];

    this.clearCanvas();
  }

  setTools(tool: Tools) {
    this.selectedTool = tool;
  }

  initHandlers() {
    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "chat") {
          const shapes = JSON.parse(data.message);
          const finalShape = shapes.shape;
          this.existingShapes.push(finalShape);
        }

        this.clearCanvas();
      } catch (err) {
        console.error("❌ Failed to parse WebSocket message:", err);
      }
    };
  }

  drawAllShapes() {
    this.existingShapes.map((shape) => {
      this.ctx.beginPath();
      this.ctx.strokeStyle = "#fff";
      if (shape.type === "rect") {
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      }
      if (shape.type === "circle") {
        this.ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
      }
      if (shape.type === "line") {
        this.ctx.beginPath();
        this.ctx.moveTo(shape.x1, shape.y1);
        this.ctx.lineTo(shape.x2, shape.y2);
        this.ctx.stroke();
      }
    });
  }

  handleMouseDown = (e: MouseEvent) => {
    this.clicked = true;
    const rect = this.canvas.getBoundingClientRect();
    this.startX = e.clientX - rect.left;
    this.startY = e.clientY - rect.top;
  };

  handleMouseUp = (e: MouseEvent) => {
    this.clicked = false;
    const rect = this.canvas.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;
    const width = endX - this.startX;
    const height = endY - this.startY;
    const radius = Math.sqrt(
      Math.pow(endX - this.startX, 2) + Math.pow(endY - this.startY, 2)
    );

    if (this.selectedTool === "rect") {
      const shape: Shapes = {
        type: "rect",
        width,
        height,
        x: this.startX,
        y: this.startY,
      };

      this.existingShapes.push(shape);

      this.socket?.send(
        JSON.stringify({
          type: "chat",
          message: JSON.stringify({ shape }),
          roomId: this.roomId,
        })
      );
    } else if (this.selectedTool === "circle") {
      const shape: Shapes = {
        type: "circle",
        radius,
        x: this.startX,
        y: this.startY,
      };
      this.existingShapes.push(shape);

      this.socket.send(
        JSON.stringify({
          type: "chat",
          message: JSON.stringify({ shape }),
          roomId: 1,
        })
      );
    } else if (this.selectedTool === "line") {
      const shape: Shapes = {
        type: "line",
        x1: this.startX,
        y1: this.startY,
        x2: endX,
        y2: endY,
      };

      this.existingShapes.push(shape);

      this.socket.send(
        JSON.stringify({
          type: "chat",
          message: JSON.stringify({ shape }),
          roomId: this.roomId,
        })
      );

      // Finalize the line
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(endX, endY);
      this.ctx.stroke();
    }

    this.clearCanvas();
  };

  handleMouseMove = (e: MouseEvent) => {
    if (!this.clicked) return;

    this.clearCanvas();

    this.ctx.beginPath();
    this.ctx.strokeStyle = "#fff";

    if (this.selectedTool === "rect") {
      const width = e.clientX - this.startX;
      const height = e.clientY - this.startY;
      this.ctx.strokeRect(this.startX, this.startY, width, height);
    }

    if (this.selectedTool === "circle") {
      const radius = Math.sqrt(
        Math.pow(e.clientX - this.startX, 2) +
          Math.pow(e.clientY - this.startY, 2)
      );
      this.ctx.arc(this.startX, this.startY, radius, 0, 2 * Math.PI);
      this.ctx.stroke();
      this.ctx.closePath();
    }

    if (this.selectedTool === "line") {
      const rect = this.canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(currentX, currentY);

      // Draw the Path
      this.ctx.stroke();
    }
  };

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.handleMouseDown);
    this.canvas.addEventListener("mouseup", this.handleMouseUp);
    this.canvas.addEventListener("mousemove", this.handleMouseMove);
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.handleMouseDown);
    this.canvas.removeEventListener("mouseup", this.handleMouseUp);
    this.canvas.removeEventListener("mousemove", this.handleMouseMove);
  }
}
