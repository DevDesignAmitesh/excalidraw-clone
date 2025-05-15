import { theme } from "@/constant";
import React from "react";
import SuperBtn from "./SuperBtn";

const Collaborating = () => {
  return (
    <div className="w-full flex justify-center items-center px-10 py-10 mt-20">
      <div
        style={{ backgroundColor: theme.bg }}
        className="flex justify-center items-center flex-col p-10 rounded-md"
      >
        <h1
          style={{ color: theme.white }}
          className="text-3xl font-semibold capitalize"
        >
          ready to start collaborating?
        </h1>
        <p
          style={{ color: theme.gray }}
          className="text-[15px] capitalize mt-3"
        >
          join thousands of teams who are already using excailsketch to bring
          their ideas to life
        </p>

        <SuperBtn label="get started for free" variant="red" className="mt-5" />
      </div>
    </div>
  );
};

export default Collaborating;
