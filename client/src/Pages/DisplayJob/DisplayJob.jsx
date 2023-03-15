import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import { getSingleJob } from "../../FetchHook/Job";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import moment from "moment";

const Category = ({ data }) => {
  return <p className="border border-orang py-1 px-3 bg-orange-50">{data}</p>;
};

const DisplayJob = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];

  const { data, isLoading, isError, error } = useQuery(["singleJob", id], () =>
    getSingleJob(id)
  );

  if (isLoading) return "Loading";
  if (isError) return "Something went wrong..." + error.msg;

  return (
    <section className="size my-12 ">
      <button
        onClick={() => navigate("/jobPosts")}
        className="mb-6 bg-orang py-1 px-4 text-white rounded-md hover:bg-orange-400"
      >
        <ArrowBackIosNewIcon sx={{ fontSize: "0.9rem" }} /> Back To All Jobs
      </button>
      <main
        className="flex flex-col-reverse items-start md:flex-row 
      justify-between gap-12"
      >
        <div className="flex-1">
          <div className="flex flex-col gap-1 font-bold uppercase text-gray-600">
            <span className="pb-2">
              Posted {moment(data.createdAt).format("MMM Do ")}
            </span>
            <span>✅ 29 applicants </span>
          </div>

          <h1 className="pt-8 pb-2 text-xl md:text-3xl font-semibold">
            {data?.job_title}
          </h1>

          <div className="flex items-center gap-2 flex-wrap mt-2">
            <Category data={data.category} />
            <Category data={data.job_type} />
            <p className="border border-orang py-1 px-3 bg-orange-50">
              $50,0000 - $90,0000
            </p>
          </div>

          <div className="flex flex-col gap-6 my-6">
            <div
              dangerouslySetInnerHTML={{ __html: data.company_description }}
            />
            <div dangerouslySetInnerHTML={{ __html: data.job_description }} />
          </div>
        </div>

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
          <h1 className="py-4 text-xl font-bold capitalize">
            {data.company_name}
          </h1>

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

          <button className="bg-orang py-2 px-4 capitalize text-white hover:bg-orange-400 mt-2">
            apply for the job
          </button>
        </div>
      </main>
    </section>
  );
};

export default DisplayJob;
