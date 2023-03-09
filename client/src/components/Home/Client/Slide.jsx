import React from "react";
import FormatQuoteOutlinedIcon from "@mui/icons-material/FormatQuoteOutlined";

const Slide = ({ slide }) => {
  return (
    <div className="bg-white my-8 lg:my-12 p-6 pt-20 mx-3 centerCard shadowCard rounded-md">
      <div className="bg-white shadowCard2 relative py-9">
        <span className="icons left-0 top-[-1rem] ">
          <FormatQuoteOutlinedIcon
            sx={{ fontSize: "2.3rem", transform: "rotate(180deg)" }}
          />
        </span>

        <span className="icons bottom-[-1rem] right-0">
          <FormatQuoteOutlinedIcon sx={{ fontSize: "2.3rem" }} />
        </span>

        <img
          className="w-[4.5rem] h-[4.5rem] object-cover rounded-full shadow-md shadow-orange-100
          profile"
          src={slide.img}
          alt="client"
        />
        <div className="text-center pt-7 px-12">
          <div className="pb-4">
            <h3 className="font-semibold text-lg">{slide.name}</h3>
            <p className="text-gray-500 text-sm capitalize">{slide.position}</p>
          </div>
          <p className="text-gray-500 text-md">{slide.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default Slide;
