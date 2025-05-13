import MainCanvas from "@/components/MainCanvas";
import React from "react";

const page = async ({ params }: { params: { roomId: string } }) => {
  const roomId = (await params).roomId;
  return <MainCanvas roomId={roomId} />;
};

export default page;
