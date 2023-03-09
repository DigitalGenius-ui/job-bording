import React from "react";

const Card = ({ title, desc, btn }) => {
  return (
    <div className="bg-jobBg bg-no-repeat bg-cover text-white p-6 md:p-16 text-center">
      <h1
        className={`py-3 relative after:content-[''] after:absolute after:left-0 
          after:right-0 after:border-2 after:border-orang after:bottom-0 after:w-[3rem]
          after:mx-auto after:rounded-full text-lg sm:text-2xl md:text-3xl font-semibold`}
      >
        {title}
      </h1>
      <p className="pt-5">{desc}</p>
      <button
        className="bg-orang mt-6 py-3 px-8 rounded-md hover:bg-orange-200 transition-all
          duration-500"
      >
        {btn}
      </button>
    </div>
  );
};

export default Card;
