"use client";

import React, { useState } from "react";
import InputBox from "./InputBox";
import { theme } from "@/constant";
import SuperBtn from "./SuperBtn";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useRouter } from "next/navigation";

const CreateRoom = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>("");
  const [roomURL, setRoomURL] = useState<string>("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRoomName(value);
    setRoomURL(value.trim().replace(/\s+/g, "-").toLowerCase());
  };

  const createRoom = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${BACKEND_URL}/create-room`,
        {
          name: roomName,
          slug: roomURL,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        router.push(`/canvas/${res.data.roomSlug}`);
      }
    } catch (error) {
      console.log(error);
      alert((error as Error).message);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-fit flex justify-center items-center">
      <div className="rounded-md p-6 mt-18 flex flex-col justify-center border border-neutral-600 w-[400px] items-center gap-5 text-white">
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <h1 className="text-2xl font-bold capitalize">create new room</h1>
          <h1 style={{ color: theme.gray }} className="text-[14px]">
            set up a new collaborative drawing room
          </h1>
        </div>
        <div className="grid grid-cols-1 w-full place-items-center place-content-center gap-5">
          <InputBox
            label="room name"
            value={roomName}
            onChange={(e) => handleChange(e)}
          />
          <InputBox
            label="room URL"
            value={roomURL}
            onChange={() => {}}
            className="cursor-not-allowed"
          />
          <SuperBtn
            label={loading ? "Loading..." : "create room"}
            variant="red"
            className="w-full mt-2"
            disabled={loading}
            onClick={createRoom}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
