import React, { useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ProfileDetails from "./ProfileDetails/ProfileDetails";
import Password from "./Password/Password";
import Dashboard from "../Dashboard/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";

const CompanyProfile = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [hieght, setHieght] = useState(0);
  return (
    <section className="bg-profileBg bg-cover bg-no-repeat lg:h-[510px] relative overflow-hidden">
      <div className="lg:fixed lg:left-0 lg:right-0 lg:top-[80px] lg:flex">
        <div className="lg:flex-1 text-white bg-slate-100 lg:bg-transparent p-5 lg:p-0">
          {/* toggle menu in responsive part  */}
          <div
            onClick={() => setShowMenu(!showMenu)}
            className="lg:hidden bg-black/70 flex justify-center items-center gap-2
            py-4 capitalize text-lg md:text-2xl rounded-md">
            <span>
              <MenuIcon sx={{ fontSize: "2rem", marginBottom: "0.1rem" }} />
            </span>
            <h1>dashboard navigation menu</h1>
          </div>
          {/* dashboard  */}
          <div
            className={`static lg:sticky lg:top-[100px] bg-gray-900 lg:h-screen z-[50]
            lg:mt-0
            ${
              showMenu
                ? "mt-5 h-auto transition-height duration-500 ease-in-out"
                : "h-0 overflow-hidden"
            } rounded-md lg:rounded-0`}>
            <Dashboard />
          </div>
        </div>

        <div className="w-full lg:flex-[3] 1114:flex-[3.5] lg:overflow-y-auto lg:h-screen">
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
          <div className=" bg-slate-100 mb-[5rem] ">
            <div className="flex flex-col lg:flex-row gap-5 mb-[5rem] p-6">
              <div className="flex-1">
                <ProfileDetails />
              </div>

              <div className="flex-1">
                <Password />
              </div>
            </div>

            {/* copyrighted  */}
            <div className="mt-5 text-center border-t border-gray-600 py-8">
              <p className="text-gray-500">
                Copyright © 2023 All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyProfile;
