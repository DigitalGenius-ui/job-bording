import React from "react";
import { totalJobs } from "./data";

const AvailableJobs = () => {
  return (
    <div className="hidden lg:flex items-center gap-5 mt-9 ">
      {totalJobs.map((total, i) => (
        <div
          key={i}
          className="w-[15rem] bg-white/20 flex items-center justify-center gap-4
            py-4 text-white font-bold rounded-md hover:scale-[1.1] cursor-pointer
            transition-all duration-500 hover:bg-orang"
        >
          <span className="bg-white/20 p-2 rounded-md">{total.icon}</span>
          <div className="text-center">
            <h4 className="text-4xl">{total.total}</h4>
            <p className="font-light">{total.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvailableJobs;
