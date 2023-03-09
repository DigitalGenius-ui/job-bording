import React from "react";
import AvailableJobs from "./AvailableJobs";
import Form from "./Form";
import Trending from "./Trending";

const Banner = () => {
  return (
    <div className="w-full h-screen bg-banner ">
      <div className="size flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl lg:text-4xl font-bold text-white text-center">
          Find Nearby Jobs <span className="text-orang">Logo Designer.</span>
        </h1>
        <p className="py-3 text-lg lg:text-xl text-white pb-10 lg:pb-0 text-center">
          It is a Long Established Fact That a Reader Will be Distracted by The
          Readable.
        </p>

        {/* search for job part  */}
        <Form />
        <Trending />
        <AvailableJobs />
      </div>
    </div>
  );
};

export default Banner;
