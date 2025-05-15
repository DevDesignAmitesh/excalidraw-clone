import Link from "next/link";
import React from "react";
import { roomsProps, theme } from "@/constant";
import SuperBtn from "./SuperBtn";

const Dashboard = ({ rooms }: { rooms: roomsProps[] }) => {
  return (
    <>
      <div className="w-full h-fit text-white flex flex-col gap-10 justify-center items-center">
        <div className="w-full flex justify-between items-center py-5">
          <h1 className="text-3xl font-semibold capitalize">your rooms</h1>
          <Link href={"/create"}>
            <SuperBtn label="create room" variant="red" />
          </Link>
        </div>
        {rooms.length === 0 ? (
          <div className="mt-10">no rooms found</div>
        ) : (
          <div className="grid w-full grid-cols-4 gap-10">
            {rooms.map((room) => (
              <Link key={room.id} href={`/canvas/${room.id.toString()}`}>
                <div className="flex w-full justify-center items-start flex-col rounded-md text-white overflow-hidden border border-neutral-600">
                  <div
                    style={{ backgroundColor: theme.bg }}
                    className="w-full py-3 px-5"
                  >
                    <p style={{ color: theme.white }}>{room.name}</p>
                    <p style={{ color: theme.gray }}>Slug: {room.slug}</p>
                  </div>
                  <div
                    style={{ backgroundColor: theme.bg }}
                    className="w-full py-3 px-5"
                  >
                    <SuperBtn
                      variant="red"
                      label="Join Room"
                      className="w-full"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
