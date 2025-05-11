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
  type: "rect" | "circle"
): (() => void) | void => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const drawAllShapes = () => {
    existingShapes.map((shape) => {
      ctx.strokeStyle = "#fff";
      ctx.beginPath();
      if (shape.type === "rect") {
        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      }
      if (shape.type === "circle") {
        ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
        ctx.stroke();
      }
    });
  };

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
      existingShapes.push({
        type: "rect",
        width,
        height,
        x: startX,
        y: startY,
      });
    } else if (type === "circle") {
      existingShapes.push({
        type: "circle",
        radius,
        x: startX,
        y: startY,
      });
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
