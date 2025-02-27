import React from "react";
import Job from "../../components/Home/LatestJob/Job";
import { PostJobContexts } from "../../Context/PostJobContext";
import Filter from "../../components/util/Filter/Filter";
import Loading from "../../Loading/Loading";
import { Button } from "@mui/material";

const AllJobs = () => {
  const {
    displayJob,
    isLoading,
    isError,
    error,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = PostJobContexts();

  const sortedData = displayJob?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  if (isLoading) return <Loading />;
  if (isError) return "Something went wrong..." + error.msg;

  return (
    <div className="size my-16">
      <h1 className="text-3xl text-center pb-12">Find Your Job</h1>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="flex-1 flex flex-col">
          <Filter
            placeHolder="Category"
            names={[
              "All",
              "Design",
              "Front-End Development",
              "Back-End Development",
              "Full-Stack Development",
              "DevOps",
            ]}
          />
          <Filter
            placeHolder="Job type"
            names={["All", "Full-Time", "Part-Time", "Contract"]}
          />
          <Filter
            placeHolder="Location"
            names={["All", "Remote", "USA", "India"]}
          />
        </div>
        <div className="flex-[3.5] flex flex-col gap-6">
          {sortedData.map((job, i) => (
            <div key={i}>
              <Job job={job} />
            </div>
          ))}
          <div className="text-center">
            {hasNextPage && (
              <Button
                onClick={fetchNextPage}
                variant="contained"
                className="w-[8rem] !py-2 !bg-orang">
                {isFetching ? "Loading" : "Load More"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
