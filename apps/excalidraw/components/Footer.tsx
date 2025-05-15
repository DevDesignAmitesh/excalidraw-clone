import { footerProps, theme } from "@/constant";
import React from "react";
import Logo from "./Logo";
import { LuGithub } from "react-icons/lu";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div
      style={{ backgroundColor: theme.bg }}
      className="w-full p-10 flex flex-col justify-center items-center gap-10 rounded-md"
    >
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col justify-center items-start w-[50%]">
          <Logo />
          <p style={{ color: theme.gray }} className="w-[80%] text-[14px] mt-2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id aliquid
            nihil quod. Commodi, illo recusandae placeat voluptatum et obcaecati
            nostrum, reprehenderit quod voluptate alias, perferendis officiis.
          </p>
          <div
            style={{ color: theme.white }}
            className="flex justify-center items-center gap-5 mt-3"
          >
            <LuGithub size={20} />
            <FaXTwitter size={20} />
            <FaLinkedinIn size={20} />
          </div>
        </div>
        <div className="grid place-content-center place-items-center gap-10 grid-cols-2">
          {footerProps.map((item) => (
            <div className="flex flex-col justify-center items-start capitalize gap-2">
              <p style={{ color: theme.white }} className="font-medium">
                {item.label}
              </p>
              {item.content.map((item) => (
                <p style={{ color: theme.gray }}>{item}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <hr className="w-full" style={{ color: theme.gray }} />
      <div className="w-full flex justify-between items-center capitalize">
        <p style={{ color: theme.gray }} className="text-[14px]">
          @ 2025 Excalisketch. All rights reserved.
        </p>
        <div className="flex justify-center items-center gap-5">
          <p style={{ color: theme.gray }} className="text-[14px]">
            privacy policy
          </p>
          <p style={{ color: theme.gray }} className="text-[14px]">
            terms of services
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
