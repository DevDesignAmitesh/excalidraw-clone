"use client";

import React, { useEffect, useState } from "react";
import Canvas from "@/components/Canvas";
import { WS_URL } from "@/config";

const MainCanvas = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(
      `${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmNTQwMWU4NS05YzVmLTQ5NTctYjMwMy02ZTIyMzAwZTVlNTUiLCJpYXQiOjE3NDcwMzM2NTJ9.VKseXsXCPaPu9DBxrlRWW6UNv7UDmiaDkZunVnBs0v4`
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
