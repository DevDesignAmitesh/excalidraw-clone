import { theme } from "@/constant";
import React from "react";
import SuperBtn from "./SuperBtn";
import Logo from "./Logo";

const Header = () => {
  return (
    <div
      className={`w-full py-5 flex justify-between items-center bg-transparent`}
    >
      <Logo />
      <div className="flex justify-center items-center gap-4">
        {/* will add link here for keeping it server comp */}
        <SuperBtn label="signin" variant="white" />
        <SuperBtn label="register" variant="black" />
      </div>
    </div>
  );
};

export default Header;
