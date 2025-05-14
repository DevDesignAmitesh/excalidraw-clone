"use client";

import { roomsProps } from "@/app/dashboard/page";
import Link from "next/link";
import React, { useState } from "react";
import CreateRoomPopup from "./CreateRoomPopup";

const Dashboard = ({ rooms }: { rooms: roomsProps[] }) => {
  const [createRoomPopup, setCreateRoomPopup] = useState<boolean>(false);
  return (
    <>
      <div className="w-full h-screen bg-[#121212] text-white flex flex-col gap-5 justify-center items-center">
        {rooms.length === 0 ? (
          <div>no rooms found</div>
        ) : (
          rooms.map((room) => (
            <Link key={room.id} href={`/canvas/${room.id.toString()}`}>
              <div className="flex justify-center items-center p-5 rounded-md bg-neutral-600 text-white">
                <p>{room.name}</p>
              </div>
            </Link>
          ))
        )}

        <div
          onClick={() => setCreateRoomPopup(true)}
          className="p-5 bg-neutral-900 text-white flex justify-center items-center"
        >
          create new room
        </div>
      </div>
      {createRoomPopup && (
        <CreateRoomPopup setCreateRoomPopup={setCreateRoomPopup} />
      )}
    </>
  );
};

export default Dashboard;
