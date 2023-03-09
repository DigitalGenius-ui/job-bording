import React from "react";
import Heading from "../../util/Heading/Heading";
import { jobs } from "./data";
import Job from "./Job";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Jobs = () => {
  return (
    <div className="size">
      <Heading
        tag="Latest Jobs Post"
        title="Jobs You May Be Interested"
        shadow="latest jobs post"
        desc={`Lorem Ipsum is simply dummy text printing and type 
        setting industry Lorem Ipsum been industry standard dummy
        text ever since when unknown printer took a galley.`}
      />

      <div className="flex flex-col gap-6 mb-8">
        {jobs.map((job, i) => (
          <Job job={job} key={i} />
        ))}
      </div>

      <div className="mb-16">
        <button
          className="bg-orang py-2 px-5 rounded-md text-white group shadow-lg shadow-orange-100
        flex items-center gap-1 justify-center mx-auto transition-all duration-500"
        >
          Browse All Jobs
          <span className="hidden group-hover:flex">
            <KeyboardArrowRightIcon />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Jobs;
