import React, { useState } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";

const Select = ({ placeHolder, data, onChange, form }) => {
  const [showDrop, setShowDrop] = useState(false);
  const [printSelect, setPrintSelect] = useState("");
  const [search, setSearch] = useState("");

  const selectHandler = (item) => {
    setShowDrop(false);
    setPrintSelect(item);
    form === "auth"
      ? onChange((prev) => ({ ...prev, signupAs: item }))
      : onChange(item);
  };

  return (
    <div
      className={`bg-white w-full py-2 lg:py-3 px-2 relative rounded-md 
    ${form === "auth" && "border"} z-30`}
    >
      <h1
        onClick={() => setShowDrop(!showDrop)}
        className={`cursor-pointer flex items-center justify-between text-gray-500 capitalize
        py-2 ${form === "auth" && "py-0 h-[1.5rem] text-sm"}`}
      >
        {printSelect || placeHolder}
        {showDrop ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </h1>

      {/* header drop down  */}
      {showDrop && (
        <div
          className="bg-white absolute top-full left-0 right-0 z-30 rounded-md 
          lg:rounded-none mt-1 lg:mt-0"
        >
          {form === "auth" ? null : (
            <div className="flex items-center bg-gray-200 mt-3 lg:mt-0 p-1 mx-2 mb-2">
              {/* search for specific category */}
              <input
                type="text"
                placeholder="search..."
                className="outline-none bg-transparent w-full text-sm px-1 py-[0.2rem]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="text-gray-600">
                <SearchIcon sx={{ fontSize: "1.3rem" }} />
              </span>
            </div>
          )}

          <ul
            className={`${
              search || form === "auth" ? "h-full mt-2" : "h-[8rem]"
            } overflow-auto 
            bg-white shadow-sm shadow-gray-600`}
          >
            {data.map((item, i) => (
              <li
                key={i}
                onClick={() => selectHandler(item)}
                className={`${
                  item?.toLowerCase().startsWith(search) ? "block" : "hidden"
                } py-2 hover:bg-orange-50 rounded-md lg:rounded-none cursor-pointer px-3 capitalize
                  border-b border-gray-200 text-gray-500`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
