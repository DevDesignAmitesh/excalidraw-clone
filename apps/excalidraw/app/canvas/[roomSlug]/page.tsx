import MainCanvas from "@/components/MainCanvas";
import React from "react";

const page = async ({ params }: { params: { roomSlug: string } }) => {
  const roomSlug = (await params).roomSlug;
  console.log(roomSlug)
  console.log("roomSlug")
  return <MainCanvas roomSlug={roomSlug} />;
};

export default page;
