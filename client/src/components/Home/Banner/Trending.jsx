import React from "react";
import { JobContext } from "../../../Context/Context";

const Trending = () => {
  const { setKeyWord } = JobContext();
  const trends = [
    "Web Designer",
    "Graphic Designer",
    "PHP Developer",
    "IOS Developer",
    "Android Developer",
    "React JS Developer",
  ];
  return (
    <div className="text-white flex items-center flex-wrap gap-2 mt-5">
      <p className="text-md">Trending Jobs Keywords : </p>
      {trends.map((trend, i) => (
        <span
          className="bg-white/20 py-[0.2rem] px-2 rounded-md text-sm
          cursor-pointer hover:bg-orang"
          onClick={() => setKeyWord(trend)}
          key={i}>
          {trend}
        </span>
      ))}
    </div>
  );
};

export default Trending;
