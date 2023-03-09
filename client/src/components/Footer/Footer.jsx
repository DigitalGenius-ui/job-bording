import React from "react";
import { footer } from "./data";
import Links from "./Links";

const Footer = () => {
  return (
    <footer className="bg-foot bg-cover bg-no-repeat bg-center pt-5">
      <div className="size flex flex-col lg:flex-row justify-between flex-wrap gap-8">
        <div className="flex-[0.6] text-center lg:text-left">
          <img
            className="w-[14rem] mx-auto lg:mx-0"
            src="./images/logo.png"
            alt=""
          />
          <p className="pt-3 text-gray-500">
            Lorem Ipsum is simply dummy text of printing and type setting
            industry. Lorem Ipsum been industry standard dummy text ever since,
            when unknown printer took a galley type scrambled.
          </p>
        </div>
        <div className="flex items-center gap-5 flex-wrap md:flex-nowrap justify-between flex-1">
          {footer.map((foot, i) => (
            <Links foot={foot} key={i} />
          ))}
        </div>
      </div>

      <div
        className="border-t border-gray-300 mt-20 flex items-center justify-center
        h-[80px]"
      >
        <p className="text-gray-500">Copyright © 2021 All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
