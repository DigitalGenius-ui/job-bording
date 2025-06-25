import React, { createContext, useContext, useState } from "react";
import { getAllJobs, searchJobs } from "../api-calls/job-api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { UserContext } from "./Context";

const PostJob = createContext();

const PostJobContext = ({ children }) => {
  const { currentUser } = UserContext();
  // search states
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [keyword, setKeyWord] = useState("");

  const {
    isLoading: searchLoading,
    isError: searchError,
    refetch,
    data: searchData,
  } = useQuery({
    queryKey: ["job"],
    queryFn: async () => await searchJobs(country, category, keyword),
    enabled: false,
    refetchOnWindowFocus: false,
    staleTime: 300000,
  });

  // fetch all data
  const {
    data: getJobs,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["job", { status: "SUCCESS" }],
    queryFn: getAllJobs,
    getNextPageParam: (lastPage, _pages) => {
      if (lastPage.page < lastPage.totalPages) {
        return +lastPage.page + 1;
      }
      return null;
    },
  });

  const allJobs = getJobs?.pages?.flatMap((page) => page.jobs) ?? [];
  const displayJob = country || category || keyword ? searchData : allJobs;

  // update job post
  const [updateJob, setUpdateJob] = useState("");

  let [jobForm, setJobForm] = useState({
    userId: currentUser?._id,
    signupAs: currentUser?.signupAs,
    job_title: "",
    category: "Front-End developer",
    job_type: "Full-Time",
    position_accross_globe: "No",
    salary_range: "25,000 - 50,000",
    country: "Remote",
    state: "Remote",
    application_link_or_email: "",
    job_description: "",
    keyword: "Web Designer",
    job_posted_before: "No",
    email_id: "something@something.com",
    company_name: currentUser?.fullName,
    company_hq: "",
    company_mission_vission: "",
    company_website: "https://",
    company_description: "",
  });

  return (
    <PostJob.Provider
      value={{
        // fetch all jobs
        isLoading,
        isError,
        error,
        displayJob,
        // search states
        setCountry,
        setCategory,
        keyword,
        setKeyWord,
        searchLoading,
        searchError,
        refetch,
        country,
        category,
        // limit for load more
        isFetching,
        hasNextPage,
        fetchNextPage,
        // update job post
        updateJob,
        setUpdateJob,
        // job post state
        jobForm,
        setJobForm,
        // get all jobs
        allJobs,
      }}
    >
      {children}
    </PostJob.Provider>
  );
};

export default PostJobContext;

export const PostJobContexts = () => useContext(PostJob);
