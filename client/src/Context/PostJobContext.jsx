import React, { createContext, useContext, useState } from "react";
import { getAllJobs, searchJobs } from "../FetchHook/Job";
import { useInfiniteQuery, useQuery } from "react-query";

const PostJob = createContext();

const PostJobContext = ({ children }) => {
  // search states
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [keyword, setKeyWord] = useState("");

  const {
    isLoading: searchLoading,
    isError: searchError,
    refetch,
    data: searchData,
  } = useQuery("job", () => searchJobs(country, category, keyword), {
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
  } = useInfiniteQuery(["job", { status: "published" }], getAllJobs, {
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
      }}>
      {children}
    </PostJob.Provider>
  );
};

export default PostJobContext;

export const PostJobContexts = () => useContext(PostJob);
