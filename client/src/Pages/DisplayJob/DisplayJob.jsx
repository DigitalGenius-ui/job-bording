import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";

const DisplayJob = () => {
  return (
    <section
      className="size my-12 flex flex-col-reverse items-start lg:flex-row 
      justify-between gap-12"
    >
      <div className="flex-1">
        <div className="flex flex-col gap-1 font-bold uppercase text-gray-600">
          <span>Posted Mar 14</span>
          <span>✅ 29 applicants </span>
        </div>

        <h1 className="pt-8 text-xl md:text-3xl font-semibold">
          Remote Senior Technical SEO Specialist
        </h1>

        <div className="flex items-center gap-2 flex-wrap mt-2">
          <p className="border border-orang py-1 px-3 bg-orange-50">
            Front-End Development
          </p>
          <p className="border border-orang py-1 px-3 bg-orange-50">
            Full-Time
          </p>
          <p className="border border-orang py-1 px-3 bg-orange-50">
            $50,0000 - $90,0000
          </p>
        </div>
      </div>

      <div
        className="shadowCard2 p-7 flex flex-col justify-center 
      items-center w-full lg:w-auto"
      >
        <div>
          <img
            className="w-[8rem] h-[8rem] object-cover rounded-full border-2 border-gray-200"
            src="https://t4.ftcdn.net/jpg/02/90/27/39/360_F_290273933_ukYZjDv8nqgpOBcBUo5CQyFcxAzYlZRW.jpg"
            alt="user"
          />
        </div>
        <h1 className="py-4 text-xl font-bold capitalize">Company Name</h1>

        <div className="text-gray-500 font-bold">
          <div className="flex items-center justify-center gap-1">
            <span>
              <LocationOnIcon />
            </span>
            <p>Amsterdam, The Netherlands </p>
          </div>

          <div className="flex items-center justify-center gap-1">
            <span>
              <LanguageIcon />
            </span>
            <a href="/">Company Website</a>
          </div>
        </div>

        <p className="py-3 font-bold capitalized text-gray-500">
          JOBS Posted 137
        </p>

        <button className="bg-orang py-2 px-4 capitalize text-white hover:bg-orange-400 mt-2">
          apply for the job
        </button>
      </div>
    </section>
  );
};

export default DisplayJob;
