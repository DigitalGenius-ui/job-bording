import React from "react";
import Heading from "../../util/Heading/Heading";
import Job from "./Job";
import { JobContext } from "../../../Context/Context";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const { allJobs, user, setOpen } = JobContext();
  const navigate = useNavigate();

  const sortedData = allJobs?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const handleNavigate = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    user ? navigate("/jobPosts") : setOpen(true);
  };

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
        {sortedData?.slice(0, 3).map((job, i) => (
          <Job job={job} key={i} />
        ))}
      </div>

      <div className="mb-16">
        <button
          onClick={handleNavigate}
          className="bg-orang py-2 px-5 rounded-md text-white shadow-lg shadow-orange-100
          flex items-center gap-1 justify-center mx-auto transition-all duration-500 border-2 border-orang
          hover:bg-transparent hover:text-orang"
        >
          {user ? "Browse All Jobs" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Jobs;
