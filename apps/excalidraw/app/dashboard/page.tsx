import Dashboard from "@/components/Dashboard";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import React from "react";

export interface roomsProps {
  id: number;
  name: string;
  createdAt: Date;
  adminId: string;
}

async function getAllRooms(): Promise<roomsProps[]> {
  const res = await axios.get(`${BACKEND_URL}/rooms`);
  console.log(res.data);
  return res.data.rooms;
}

const page = async () => {
  const rooms = await getAllRooms();
  return <Dashboard rooms={rooms} />;
};

export default page;
