import { keyFeatures } from "@/constant";
import React from "react";
import HeadingWithIconAndCard from "./HeadingWithIconAndCard";

const KeyFeatures = () => {
  return (
    <div className="w-full px-10 py-20 mt-20">
      <HeadingWithIconAndCard data={keyFeatures} label="key features" />;
    </div>
  );
};

export default KeyFeatures;
