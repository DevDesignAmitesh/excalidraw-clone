import { theme } from "@/constant";
import React from "react";

const Logo = () => {
  return (
    <h1
      style={{ color: theme.orangeColor }}
      className={`font-bold text-xl capitalize`}
    >
      excalisketch
    </h1>
  );
};

export default Logo;
