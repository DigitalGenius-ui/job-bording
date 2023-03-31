import React from "react";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const Subscribe = () => {
  return (
    <section
      className="size bg-subscribe bg-no-repeat bg-cover bg-center mt-4 mb-16 text-white
        rounded-lg p-4 relative"
    >
      <div
        className="flex flex-col gap-4 text-center items-center justify-between p-8 py-14
        lg:text-left lg:flex-row"
      >
        <div className="flex-[1.5]">
          <span className="absolute top-4 left-4">
            <StarBorderOutlinedIcon />
          </span>
          <h1 className="text-4xl font-bold mb-2 lg:w-[90%]">
            Subscribe to Our Newsletter!
          </h1>
          <p className="text-lg text-gray-300">
            Subscribe to get latest updates and information.
          </p>
        </div>
        <div
          className="bg-white flex items-center md:flex-row rounded-md overflow-hidden
            flex-1 w-full md:w-auto"
        >
          <div className="flex items-center gap-2 p-3 flex-1">
            <span className="text-gray-500">
              <EmailOutlinedIcon sx={{ fontSize: "1rem" }} />
            </span>
            <input
              type="text"
              placeholder="Enter Your Email"
              className="outline-none bg-none text-black/80 text-sm w-full"
            />
          </div>
          <button
            className="bg-orang p-4 px-1 text-sm sm:text-md sm:px-5
            hover:opacity-50 transition-all duration-500"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
