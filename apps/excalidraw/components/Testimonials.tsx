import { testimonials, theme } from "@/constant";
import React from "react";

const Testimonials = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-10 px-10 py-15 mt-20">
      <h1
        style={{ color: theme.white }}
        className="text-3xl font-medium capitalize"
      >
        what our users say
      </h1>
      <div className="w-full grid grid-cols-2 place-items-center place-content-center px-40 gap-10">
        {testimonials.map((item) => (
          <div
            style={{ backgroundColor: theme.bg }}
            className="w-full flex flex-col justify-center items-start p-10 rounded-md border border-neutral-600 gap-5"
          >
            <p
              style={{ color: theme.white }}
              className="italic capitalize text-[14px]"
            >
              "{item.content}"
            </p>
            <p style={{ color: theme.orangeColor }} className="capitalize">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
