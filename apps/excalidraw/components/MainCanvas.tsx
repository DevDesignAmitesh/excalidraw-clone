"use client";

import React, { useEffect, useState } from "react";
import Canvas from "@/components/Canvas";
import { WS_URL } from "@/config";

const MainCanvas = ({ roomSlug }: { roomSlug: string }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Only runs on client'
    console.log(roomSlug);
    const token = localStorage.getItem("token");
    const ws = new WebSocket(`${WS_URL}?token=${token}`);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join_room",
          roomSlug,
        })
      );
      setSocket(ws);
    };

    return () => {
      ws.close();
    };
  }, [roomSlug]); // run only once per roomSlug

  if (!socket) {
    return <div>connecting to server...</div>;
  }

  return <Canvas socket={socket} roomSlug={roomSlug} />;
};

export default MainCanvas;
