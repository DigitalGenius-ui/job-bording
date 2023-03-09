import React from "react";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

const Job = ({ job }) => {
  return (
    <div
      className="flex flex-col md:flex-row items-center gap-8 bg-cardBg px-3 py-6 shadowCard cursor-pointer
        hover:border border-orang hover:border-l-4 transition-scale duration-500 hover:scale-[1.030] group"
    >
      <div className="border-2 rounded-full p-1">
        <img
          className="w-[4rem] h-[4rem] object-cover rounded-full"
          src="https://t4.ftcdn.net/jpg/02/90/27/39/360_F_290273933_ukYZjDv8nqgpOBcBUo5CQyFcxAzYlZRW.jpg"
          alt="profile"
        />
      </div>

      <div className="flex-1">
        <div className="bg-green/20 text-green inline p-1 rounded-md">
          <span>
            <WorkOutlineOutlinedIcon
              sx={{ fontSize: "1rem", marginBottom: "0.2rem" }}
            />
          </span>
          <span className="capitalize ml-2 text-sm font-semibold">
            {job.type}
          </span>
        </div>
        <h2 className="py-3 text-xl capitalize">{job.title}</h2>

        <div className="flex items-center flex-wrap gap-3">
          {job.tags.map((tag, i) => (
            <div
              key={i}
              className="shadowCard px-1 py-[0.2rem] bg-white flex items-center gap-1 rounded-md
              text-gray-500"
            >
              <span>{tag.icon}</span>
              <span className="capitalize mt-1 text-sm">{tag.title}</span>
            </div>
          ))}
        </div>
      </div>
      <button
        className="bg-orang px-6 py-[0.6rem] rounded-md flex items-center justify-center gap-2
      text-white capitalize group-hover:bg-black w-full md:w-auto"
      >
        brows job
        <span className="bg-white text-orang rounded-full p-1">
          <CampaignOutlinedIcon />
        </span>
      </button>
    </div>
  );
};

export default Job;
