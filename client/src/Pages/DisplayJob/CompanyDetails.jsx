import React from "react";
import { JobContext } from "../../Context/Context";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

const Company = ({ data }) => {
  const { user } = JobContext();
  return (
    <div
      className="shadowCard2 p-7 flex flex-col justify-center 
          items-center w-full md:w-[15rem] lg:w-[20rem]"
    >
      <div>
        <img
          className="w-[8rem] h-[8rem] object-cover rounded-full border-2 border-gray-200"
          src="https://t4.ftcdn.net/jpg/02/90/27/39/360_F_290273933_ukYZjDv8nqgpOBcBUo5CQyFcxAzYlZRW.jpg"
          alt="user"
        />
      </div>
      <h1 className="py-4 text-xl font-bold capitalize">{data.company_name}</h1>

      <div className="text-gray-500 font-bold">
        <div className="flex items-center justify-center gap-1">
          <span>
            <LocationOnIcon />
          </span>
          <p>{data.company_hq}</p>
        </div>

        <div className="flex items-center justify-center gap-1">
          <span>
            <LanguageIcon />
          </span>
          <a href={data.company_website} target="_blank" rel="noreferrer">
            Company Website
          </a>
        </div>
      </div>

      <p className="py-3 font-bold capitalized text-gray-500">
        JOBS Posted 137
      </p>

      {user?.signupAs !== "Employer" ? (
        <a
          href={`mailto:${data.application_link_or_email}`}
          className={`bg-orang py-2 px-4 capitalize text-white hover:bg-orange-400 mt-2
              ${!user && "pointer-events-none bg-orange-200"}`}
        >
          apply for the job
        </a>
      ) : null}

      <Link to={`/companyProf/${data.userId}`}>
        <button
          className="font-extrabold text-lg border-t border-gray-300 mt-8
          pt-5 text-orang leading-6"
        >
          <div className="lg:flex lg:flex-col">
            View Company Profile &
            <span className="ml-1 lg:m-0">
              All Jobs
              <span className="bg-orang text-white rounded-sm ml-1">
                <ArrowForwardIcon />
              </span>
            </span>
          </div>
        </button>
      </Link>
    </div>
  );
};

export default Company;
