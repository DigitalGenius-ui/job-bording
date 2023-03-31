import React from "react";

const Heading = ({ tag, title, shadow, desc }) => {
  return (
    <div className="py-16 text-center">
      <p className="bg-orang px-2 py-1 text-white rounded-md font-bold inline">
        {tag}
      </p>
      <div className="flex items-center justify-center relative">
        <h1
          className={`py-3 relative after:content-[''] after:absolute after:left-0 
          after:right-0 after:border-2 after:border-orang after:bottom-0 after:w-[3rem]
          after:mx-auto after:rounded-full text-2xl md:text-3xl font-semibold`}
        >
          {title}
        </h1>
      </div>
      <p className="w-full lg:w-[60%] mx-auto mt-4 text-gray-500">{desc}</p>
    </div>
  );
};

export default Heading;
