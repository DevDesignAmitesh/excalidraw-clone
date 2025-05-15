"use client";

import Dashboard from "@/components/Dashboard";
import { BACKEND_URL } from "@/config";
import { roomsProps } from "@/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [rooms, setRooms] = useState<roomsProps[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/rooms`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        setRooms(res.data.rooms ?? []);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  return <Dashboard rooms={rooms} />;
};

export default Page;
