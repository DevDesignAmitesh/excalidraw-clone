import { Game, Tools } from "@/draw/Game";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { FaRegCircle, FaRegSquare } from "react-icons/fa";
import { SlPencil } from "react-icons/sl";
import { TfiLayoutLineSolid } from "react-icons/tfi";

interface ShapesProps {
  type: Tools;
  icon: ReactElement;
}

const shapes: ShapesProps[] = [
  { type: "rect", icon: <FaRegSquare size={18} /> },
  { type: "circle", icon: <FaRegCircle size={18} /> },
  { type: "line", icon: <TfiLayoutLineSolid size={18} /> },
  { type: "pencil", icon: <SlPencil size={18} /> },
];

const Canvas = ({
  socket,
  roomSlug,
}: {
  socket: WebSocket;
  roomSlug: string;
}) => {
  console.log(roomSlug, "in the cnavs");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [type, setType] = useState<Tools>("rect");
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    game?.setTools(type);
  }, [type, game]);

  useEffect(() => {
    if (canvasRef.current) {
      const g = new Game(canvasRef.current, socket, roomSlug);
      setGame(g);

      return () => {
        g.destroy();
      };
    }
  }, [canvasRef]);
  return (
    <div className="relative min-h-screen w-full">
      <canvas
        ref={canvasRef}
        width={1500}
        height={1000}
        className="relative w-full h-full"
      />
      <div className="absolute top-4 rounded-md left-1/2 transform -translate-x-1/2 flex justify-center items-center w-[400px] bg-neutral-700rounded-md p-2 text-white z-50 bg-[#232329] gap-2">
        {shapes.map((item) => (
          <p
            onClick={() => setType(item.type)}
            key={item.type}
            className={`p-2 cursor-pointer rounded-md flex justify-center items-center ${item.type === type ? "bg-[#403E6A]" : "hover:bg-[#2E2D39]"}`}
          >
            {item.icon}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Canvas;
