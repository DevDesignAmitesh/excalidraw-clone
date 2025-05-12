"use client";

import React, { useEffect, useState } from "react";
import Canvas from "@/components/Canvas";
import { WS_URL } from "@/config";

const MainCanvas = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(
      `${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwYTgwMmQxYy1hZDI5LTQxZjEtOWNlNi0zNDkzM2NjMGNlMmEiLCJpYXQiOjE3NDcwMjM1Mzh9.33oFB4hsOrstvJIA6fOM5rk1JiGdkk8TwHOKcalZanc`
    );

    ws.onopen = () => {
      setSocket(ws);
    };
    setTimeout(() => {
      console.log("sending");
      ws.send(
        JSON.stringify({
          type: "join_room",
          roomId: 1,
        })
      );
    }, 2000);
  }, []);

  if (!socket) {
    return <div>connectig to server...</div>;
  }
  return <Canvas socket={socket} />;
};

export default MainCanvas;
