import React, { useEffect } from "react";
import { getSingleJob, removeJob } from "../../FetchHook/Job";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import moment from "moment";
import { JobContext } from "../../Context/Context";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import Company from "./CompanyDetails";
import Loading from "../../Loading/Loading";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { PostJobContexts } from "../../Context/PostJobContext";

const Category = ({ data }) => {
  return <p className="border border-orang py-1 px-3 bg-orange-50">{data}</p>;
};

const DisplayJob = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setAlert } = JobContext();
  const { setUpdateJob } = PostJobContexts();
  const id = location.pathname.split("/")[2];

  // get single job
  const { data, isLoading, isError, error } = useQuery(["singleJob", id], () =>
    getSingleJob(id)
  );

  // remove a job
  const queryClient = useQueryClient();
  const {
    mutateAsync,
    isLoading: removeLoading,
    isError: removeError,
  } = useMutation("job", removeJob, {
    onSuccess: () => queryClient.invalidateQueries("job"),
  });

  // remove single job
  const removeSingleJob = async () => {
    try {
      await mutateAsync(id);
      setAlert({
        type: "success",
        message: "Job has been removed successfully.",
        open: true,
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  // update job post
  useEffect(() => {
    setUpdateJob(data);
  }, [data, setUpdateJob]);

  const handleUpdate = () => {
    setUpdateJob(data);
    navigate(`/addJob`);
  };

  if (isLoading || removeLoading) return <Loading />;
  if (isError || removeError) return "Something went wrong..." + error.msg;

  return (
    <section className="size my-12 ">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/jobPosts")}
          className="bg-orang py-1 px-4 text-white rounded-md hover:bg-orange-400">
          <ArrowBackIosNewIcon sx={{ fontSize: "0.9rem" }} /> Back To All Jobs
        </button>

        {/* update and delete buttons  */}
        {data.userId === user?._id && (
          <div className="flex items-center gap-1">
            <span
              onClick={handleUpdate}
              className="cursor-pointer hover:opacity-75 text-gray-500">
              <BorderColorIcon
                sx={{
                  fontSize: "1.3rem",
                  marginBottom: "0.2rem",
                  pointerEvents: "none",
                }}
              />
            </span>
            <span
              onClick={removeSingleJob}
              className="cursor-pointer hover:opacity-75 text-gray-500">
              <DeleteIcon sx={{ fontSize: "1.4rem" }} />
            </span>
          </div>
        )}
      </div>
      <main
        className="flex flex-col-reverse items-start md:flex-row 
        justify-between gap-12">
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
            {data.position_accross_globe === "Yes" && (
              <Category data={data.country} />
            )}
            {data.salary_range && <Category data={data.salary_range} />}
          </div>

          <div className="flex flex-col gap-6 my-6">
            <div
              dangerouslySetInnerHTML={{ __html: data.company_description }}
            />
            <div dangerouslySetInnerHTML={{ __html: data.job_description }} />
          </div>

          <div className="pt-16 flex justify-between">
            {user?.signupAs !== "Employer" ? (
              <a
                href={`mailto:${data.application_link_or_email}`}
                className={`bg-orang py-2 px-4 capitalize text-white hover:bg-orange-400 mt-2
              ${!user && "pointer-events-none bg-orange-200"}`}>
                apply for the job
              </a>
            ) : null}

            <div>
              <h1>Share this job:</h1>
              <div className="flex items-center gap-2">
                <span className="cursor-pointer hover:opacity-75 text-blue-700">
                  <LinkedInIcon />
                </span>
                <span className="cursor-pointer hover:opacity-75 text-sky-400">
                  <TwitterIcon />
                </span>
              </div>
            </div>
          </div>
          {/* help center  */}

          <div className="border bg-slate-50 p-4 mt-6">
            <h1 className="font-bold">
              Help us maintain the quality of jobs posted on We Work Remotely.
            </h1>
            <p className="py-3 font-light">Is there any issue with this job?</p>
            <button className="border bg-white py-3 px-6 font-bold capitalize">
              let us know!
            </button>
          </div>
        </div>

        <Company data={data} />
      </main>
    </section>
  );
};

export default DisplayJob;
