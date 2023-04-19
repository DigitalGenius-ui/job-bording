import React from "react";
import Select from "../../util/Select/Select";
import SearchIcon from "@mui/icons-material/Search";
import { JobContext } from "../../../Context/Context";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Loading/Loading";

const Form = () => {
  const {
    setCountry,
    setCategory,
    keyword,
    setKeyWord,
    searchLoading,
    searchError,
    refetch,
    country,
    category,
  } = JobContext();

  const { displayJob } = JobContext();
  const getCountries = [...new Set(displayJob?.map((count) => count?.country))];
  const getCategory = [...new Set(displayJob?.map((cat) => cat?.category))];
  const getKeyword = [...new Set(displayJob?.map((cat) => cat?.keyword))];

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(
      `/jobPosts?country=${country}&category=${category}&keyword=${keyword}`
    );
    refetch();
  };

  if (searchLoading) return <Loading />;
  if (searchError) return "Something went wrong!!!";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center flex-col gap-4 lg:gap-2 bg-white/20 lg:bg-white w-full lg:mt-5 lg:px-3 
        rounded-md lg:rounded-full border-4 border-gray-300/20 lg:border-gray-300 lg:flex-row 
        p-3 lg:p-0">
      <div
        className="flex-1 flex items-center bg-white lg:bg-transparent gap-1 
          lg:border-r border-gray-300 h-full w-full rounded-md px-2 lg:px-0 relative">
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
        {keyword.length > 0 && (
          <ul
            className="bg-white absolute top-[90%] left-0 right-0 p-1
          flex flex-col gap-0">
            {getKeyword.map((key, i) => (
              <li
                onClick={() => setKeyWord(key)}
                key={i}
                className={`
              ${key?.toLowerCase().startsWith(keyword) ? "block" : "hidden"}
            hover:bg-orange-50 py-[2px] text-sm cursor-pointer`}>
                {key}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex-1 lg:border-r border-gray-300 h-full w-full">
        <Select
          placeHolder={"Select Country..."}
          data={getCountries}
          onChange={setCountry}
        />
      </div>

      <div className="flex-1 lg:border-r border-gray-300 h-full w-full">
        <Select
          placeHolder={"All Categories..."}
          data={getCategory}
          onChange={setCategory}
        />
      </div>

      <button
        className="uppercase bg-orang py-3 px-5 rounded-md w-full lg:w-[11rem] lg:rounded-full text-white
          flex items-center justify-center gap-1 lg:my-2 hover:bg-black transition-all duration-500">
        <SearchIcon /> search jobs
      </button>
    </form>
  );
};

export default Form;
