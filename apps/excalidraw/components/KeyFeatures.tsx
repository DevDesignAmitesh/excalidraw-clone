import { keyFeatures, theme } from "@/constant";
import React from "react";

const KeyFeatures = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-10 mt-15 px-40">
      <h1 style={{ color: theme.white }} className="text-3xl font-medium">
        KeyFeatures
      </h1>
      <div className="w-full grid grid-cols-3 gap-5 place-items-center place-content-center">
        {keyFeatures.map((item) => (
          <div
            key={item.label}
            style={{ backgroundColor: theme.bg }}
            className="flex flex-col justify-center items-start gap-2 p-5 rounded-md border border-neutral-600"
          >
            <h1
              style={{ color: theme.white }}
              className="capitalize font-semibold text-xl"
            >
              {item.label}
            </h1>
            <h1 style={{ color: theme.gray }} className="w-full capitalize">
              {item.content}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyFeatures;
