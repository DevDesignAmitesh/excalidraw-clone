import React from "react";
import HeadingWithIconAndCard from "./HeadingWithIconAndCard";
import { howItWorks, theme } from "@/constant";

const HowItWorks = () => {
  return (
    <div
      style={{ backgroundColor: theme.bg }}
      className="w-full px-10 py-20 mt-20"
    >
      <HeadingWithIconAndCard data={howItWorks} label="how it works" />
    </div>
  );
};

export default HowItWorks;
