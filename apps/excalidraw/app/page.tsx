"use client";

import { drawInit } from "@/draw";
import { FaRegCircle, FaRegSquare } from "react-icons/fa";
import React, { ReactElement, useEffect, useRef, useState } from "react";

interface ShapesProps {
  type: "rect" | "circle";
  icon: ReactElement;
}

const shapes: ShapesProps[] = [
  { type: "rect", icon: <FaRegSquare size={18} /> },
  { type: "circle", icon: <FaRegCircle size={18} /> },
];

const page = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [type, setType] = useState<"rect" | "circle">("rect");

  useEffect(() => {
    if (canvasRef.current) {
      const cleanup = drawInit(canvasRef.current, type);

      return () => {
        if (typeof cleanup === "function") {
          cleanup();
        }
      };
    }
  }, [canvasRef, type]);

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

export default page;
