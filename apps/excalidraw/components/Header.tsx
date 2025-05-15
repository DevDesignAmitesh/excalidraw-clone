import { theme } from "@/constant";
import React from "react";
import SuperBtn from "./SuperBtn";
import Logo from "./Logo";
import Link from "next/link";

const Header = () => {
  return (
    <div
      className={`w-full py-5 flex justify-between items-center bg-transparent`}
    >
      <Logo />
      <div className="flex justify-center items-center gap-4">
        <Link href={"/signin"}>
          <SuperBtn label="sign in" variant="white" />
        </Link>
        <Link href={"/signup"}>
          <SuperBtn label="register" variant="black" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
