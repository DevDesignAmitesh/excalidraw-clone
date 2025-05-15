import { theme } from "@/constant";
import React from "react";
import SuperBtn from "./SuperBtn";

const Header = () => {
  return (
    <div
      className={`w-full py-5 flex justify-between items-center bg-transparent`}
    >
      <h1
        style={{ color: theme.orangeColor }}
        className={`font-bold text-xl capitalize`}
      >
        excalisketch
      </h1>
      <div className="flex justify-center items-center gap-4">
        {/* will add link here for keeping it server comp */}
        <SuperBtn label="signin" variant="white" />
        <SuperBtn label="register" variant="black" />
      </div>
    </div>
  );
};

export default Header;
