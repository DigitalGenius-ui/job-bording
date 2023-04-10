import React from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Details from "./Details";

const CompanyProfile = () => {
  return (
    <section className="bg-profileBg bg-cover bg-no-repeat h-[510px] relative overflow-hidden">
      <div className="fixed left-0 right-0 top-[80px] flex">
        <div className="flex-1 text-white">
          <div className="sticky top-[100px] bg-black h-screen">dashboard</div>
        </div>

        <div className="flex-[3] overflow-y-auto h-screen">
          <div className="flex justify-between items-center text-white py-[3rem] px-5">
            <h1 className="text-2xl capitalize font-bold">career objective</h1>
            <div className="flex items-center text-sm">
              <p className="cursor-pointer hover:text-orang">Home</p>
              <span>
                <ArrowRightIcon />
              </span>
              <p>Profile</p>
            </div>
          </div>
          <div className=" bg-slate-100 p-6 mb-[5rem]">
            <Details />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyProfile;
