import React from "react";

const SingleCategory = ({ cat }) => {
  return (
    <div
      className="bg-cardBg bg-no-repeat border border-gray-200 p-2 font-semibold
    hover:scale-[1.1] cursor-pointer hover:rounded-md hover:bg-none hover:bg-orang
    hover:text-white transition duration-500 group"
    >
      <span
        className="text-sm bg-gray-400/20 py-1 px-2 rounded-md text-gray-600
    group-hover:text-white"
      >
        {cat.opening} Opening
      </span>
      <div className="flex flex-col justify-center items-center gap-2">
        <span
          className="border-2 border-gray-200 rounded-full p-3
        text-orang bg-white"
        >
          {cat.icon}
        </span>
        <h2 className="capitalize">{cat.title}</h2>
        <p
          className="text-sm bg-gray-400/20 py-1 px-2 rounded-md text-gray-600 mb-4
              group-hover:text-white"
        >
          {cat.job} Jobs
        </p>
      </div>
    </div>
  );
};

export default SingleCategory;
