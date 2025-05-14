"use client";

import React, { useEffect, useState } from "react";
import Canvas from "@/components/Canvas";
import { WS_URL } from "@/config";

const MainCanvas = ({ roomId }: { roomId: string }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Only runs on client
    const token = localStorage.getItem("token");
    const ws = new WebSocket(`${WS_URL}?token=${token}`);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join_room",
          roomId,
        })
      );
      setSocket(ws);
    };

    return () => {
      ws.close();
    };
  }, [roomId]); // run only once per roomId

  if (!socket) {
    return <div>connecting to server...</div>;
  }

  return <Canvas socket={socket} roomId={roomId} />;
};

export default MainCanvas;
