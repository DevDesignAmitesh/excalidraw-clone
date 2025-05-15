import { HeadingWithIconAndCardProps, theme } from "@/constant";
import React from "react";

const HeadingWithIconAndCard = ({
  data,
  label,
}: {
  data: HeadingWithIconAndCardProps[];
  label: string;
}) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-10 px-40">
      <h1
        style={{ color: theme.white }}
        className="text-3xl font-medium capitalize"
      >
        {label}
      </h1>
      <div className="w-full grid grid-cols-3 gap-5 place-items-center place-content-center">
        {data.map((item) => (
          <div
            key={item.label}
            style={{ backgroundColor: theme.bg }}
            className="flex flex-col justify-center items-center gap-2 p-5 rounded-md border border-neutral-600"
          >
            <div
              style={{ backgroundColor: theme.orangeColor, color: theme.black }}
              className="h-12 w-12 rounded-full flex justify-center items-center"
            >
              {item.icon}
            </div>
            <h1
              style={{ color: theme.white }}
              className="capitalize font-semibold text-xl mt-2"
            >
              {item.label}
            </h1>
            <h1
              style={{ color: theme.gray }}
              className="capitalize text-center w-[71%]"
            >
              {item.content}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeadingWithIconAndCard;
