import axios from "axios";
import { Shapes } from "./Game";
import { BACKEND_URL } from "@/config";

export const getAllShapes = async (
  roomId: string
): Promise<Shapes[] | null> => {
  try {
    console.log("roomId", roomId);
    const res = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    const chatData = res.data.chat ?? []; // array of messages

    const shapes = chatData.map((x: { message: string }) => {
      const messageData = JSON.parse(x.message);
      return messageData.shape ?? [];
    });

    return shapes;
  } catch (err) {
    console.error("❌ Error fetching shapes:", err);
    return null;
  }
};
