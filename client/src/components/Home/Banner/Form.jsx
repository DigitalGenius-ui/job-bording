import React, { useState } from "react";
import { categories, countries } from "./data";
import Select from "../../util/Select/Select";
import SearchIcon from "@mui/icons-material/Search";

const Form = () => {
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [keyword, setKeyWord] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(country, category, keyword);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center flex-col gap-4 lg:gap-2 bg-white/20 lg:bg-white w-full lg:mt-5 lg:px-3 
        rounded-md lg:rounded-full border-4 border-gray-300/20 lg:border-gray-300 lg:flex-row 
        p-3 lg:p-0"
    >
      <div
        className="flex-1 flex items-center bg-white lg:bg-transparent gap-1 
          lg:border-r border-gray-300 h-full w-full rounded-md px-2 lg:px-0"
      >
        <span className="text-gray-500">
          <SearchIcon sx={{ fontSize: "1.6rem" }} />
        </span>
        <input
          type="text"
          placeholder="Search Job Keywords..."
          className="py-4 outline-none w-full bg-transparent"
          value={keyword}
          onChange={(e) => setKeyWord(e.target.value)}
        />
      </div>

      <div className="flex-1 lg:border-r border-gray-300 h-full w-full z-50">
        <Select
          placeHolder={"Select Country..."}
          data={countries}
          onChange={setCountry}
        />
      </div>

      <div className="flex-1 lg:border-r border-gray-300 h-full w-full">
        <Select
          placeHolder={"All Categories..."}
          data={categories}
          onChange={setCategory}
        />
      </div>

      <button
        className="uppercase bg-orang py-3 px-5 rounded-md w-full lg:w-[11rem] lg:rounded-full text-white
          flex items-center justify-center gap-1 lg:my-2 hover:bg-black transition-all duration-500"
      >
        <SearchIcon /> search jobs
      </button>
    </form>
  );
};

export default Form;
