import { theme } from "@/constant";
import React from "react";
import SuperBtn from "./SuperBtn";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="w-full h-auto flex flex-col justify-start items-center pt-20">
      <h1
        style={{ color: theme.white }}
        className="text-[70px] font-bold capitalize leading-[90px]"
      >
        collaborate and draw together
      </h1>
      <p style={{ color: theme.gray }} className="text-xl capitalize">
        create beautiful hand-drawn diagrams and sketches in real-time with your
        team
      </p>
      <div className="w-full flex justify-center items-center gap-5 mt-6">
        {/* will add link here for keeping it server comp */}

        <Link href={"/signin"}>
          <SuperBtn variant="black" label="sign in" />
        </Link>
        <Link href={"/signup"}>
          <SuperBtn variant="red" label="get started" />
        </Link>
      </div>
      <section className="w-full mt-14">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            style={{ color: theme.white }}
            className="text-3xl font-medium capitalize mb-2"
          >
            interactive canvas demo
          </h2>
          <p
            style={{ color: theme.gray }}
            className="text-[14px] capitalize mb-8"
          >
            create beautiful hand-drawn diagrams and sketches in real-time with
            your team
          </p>
          <div className="aspect-video relative group cursor-pointer rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center z-10">
              {/* Optional overlay or play icon */}
            </div>
            <video controls className="w-full h-full object-cover">
              <source
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/videos/resume.mp4`}
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
