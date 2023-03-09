import React from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

const Links = (props) => {
  const { title, sub } = props.foot;
  return (
    <div className="text-center md:text-left">
      <h1
        className="text-xl relative after:content-[''] after:absolute after:bottom-0 
          after:right-0 after:left-0 after:border-[1.5px] after:border-orang after:rounded-full
          after:w-[2rem] py-1 mb-4 after:mx-auto md:after:mx-0"
      >
        {title}
      </h1>
      <ul className="flex flex-col gap-3 text-gray-500 capitalize">
        {sub.map((item, i) => (
          <li
            className="flex items-center gap-1 hover:tracking-wide transition-all 
            duration-500 hover:text-orang justify-center md:justify-start"
            key={i}
          >
            <span>
              <ArrowForwardIosOutlinedIcon sx={{ fontSize: "0.9rem" }} />
            </span>
            <a href={item.path}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Links;
