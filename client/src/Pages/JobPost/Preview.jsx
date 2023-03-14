import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";

const Preview = () => {
  return (
    <section>
      <h1 className="text-center text-2xl py-8">Preview job post</h1>
      <div className="flex flex-col-reverse lg:flex-row gap-8 mt-7">
        <div className="flex-[1.8]">
          <span className="text-sm font-bold">POSTED DATE: 03.03.2022</span>

          <div>
            <h1 className="pt-7 pb-3 text-3xl font-semibold">Senior Designer</h1>

            <div className="flex items-center gap-4 flex-wrap">
              <p className="border border-green py-2 px-3 rounded-full text-green text-sm">Front-End Developer</p>
              <p className="border border-green py-2 px-3 rounded-full text-green text-sm">Full Time</p>
            </div>

            <textarea
              className="w-full border resize-none outline-none p-3 mt-4"
              readOnly
              cols="30"
              rows="10"
            ></textarea>
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-3xl">Company Name</h1>

          <div className="flex items-center gap-5 mt-6">
            <LocationOnIcon />
            <p> Company HQ</p>
          </div>

          <div className="flex items-center gap-5 mt-6">
            <LanguageIcon />
            <p>Company Website</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preview;
