import React from "react";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { JobContext } from "../../../Context/Context";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const { allUser } = JobContext();

  const postUser = allUser?.find((userId) => userId?._id === job?.userId);
  const folder = process.env.REACT_APP_FOLDER;

  // date validation
  const currentDate = moment(job.createdAt);
  const get90Days = moment(currentDate).add(90, "days");
  const dateDifferences = moment(get90Days).diff(currentDate, "days");

  return (
    <div
      onClick={() => navigate(`/jobPosts/${job._id}`)}
      className={`flex flex-col md:flex-row items-center gap-8 bg-cardBg px-3 py-6 shadowCard cursor-pointer
        hover:border border-orang hover:border-l-4 transition-all duration-100 group
        ${dateDifferences <= 0 && "pointer-events-none text-gray-600"}
        `}>
      <div className="border-2 rounded-full p-1 bg-white">
        {postUser?.userProfile ? (
          <img
            className="w-[4rem] h-[4rem] object-cover rounded-full"
            src={folder + postUser?.userProfile}
            alt="profile"
          />
        ) : (
          <div
            className="text-center w-[4rem] h-[4rem] flex items-center justify-center
            text-sm">
            Company <br /> Logo
          </div>
        )}
      </div>

      <div className="flex-1">
        <div className="bg-green/20 text-green inline p-1 rounded-md">
          <span>
            <WorkOutlineOutlinedIcon
              sx={{ fontSize: "1rem", marginBottom: "0.2rem" }}
            />
          </span>
          <span className="capitalize ml-2 text-sm font-semibold">
            {job.job_type}
          </span>
        </div>
        <h2 className="py-3 text-xl capitalize">{job.job_title}</h2>

        <div className="flex items-center flex-wrap gap-3">
          <div
            className="shadowCard px-1 py-[0.2rem] bg-white flex items-center 
            gap-1 rounded-md text-gray-500">
            <span>
              <LocationOnOutlinedIcon
                sx={{ fontSize: "1rem", color: "#12b6e8" }}
              />
            </span>
            <span className="capitalize mt-1 text-sm">
              {job.position_accross_globe === "Yes"
                ? job.country
                : job.company_hq}
            </span>
          </div>

          <div
            className="shadowCard px-1 py-[0.2rem] bg-white flex items-center 
            gap-1 rounded-md text-gray-500">
            <span>
              <WorkOutlineOutlinedIcon
                sx={{ fontSize: "1rem", color: "#12b6e8" }}
              />
            </span>
            <span className="capitalize mt-1 text-sm">{job.category}</span>
          </div>

          <div
            className="shadowCard px-1 py-[0.2rem] bg-white flex items-center 
            gap-1 rounded-md text-gray-500">
            <span>
              <AccessTimeOutlinedIcon
                sx={{ fontSize: "1rem", color: "#12b6e8" }}
              />
            </span>
            <span className="capitalize mt-1 text-sm">
              {dateDifferences <= 0
                ? "Expired"
                : moment(job.createdAt).fromNow()}
            </span>
          </div>
        </div>
      </div>
      <button
        className="bg-orang px-6 py-[0.6rem] rounded-md flex items-center justify-center gap-2
      text-white capitalize group-hover:bg-black w-full md:w-auto">
        brows job
        <span className="bg-white text-orang rounded-full p-1">
          <CampaignOutlinedIcon />
        </span>
      </button>
    </div>
  );
};

export default Job;
