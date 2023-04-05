import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import ResponsiveDetails from "./ResponsiveDetails";
import EditIcon from "@mui/icons-material/Edit";
import { useQuery } from "react-query";
import { singleUser } from "../../../FetchHook/User";
import { JobContext } from "../../../Context/Context";
import Job from "../../../components/Home/LatestJob/Job";

const Detail = ({ title, desc }) => {
  return (
    <div className="text-xl font-medium pb-3 capitalize">
      <h1 className="text-gray-400 !font-poppins text-lg">{title}</h1>
      <p className="text-base leading-5 !font-poppins">{desc}</p>
    </div>
  );
};

const CompanyProfile = () => {
  const navigate = useNavigate();
  const { setUserData, user: users, allJobs } = JobContext();
  const id = window.location.pathname.split("/")[2];
  const [details, setDetails] = useState({});
  const [active, setActive] = useState("");

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery(["users", id], () => singleUser(id));

  useEffect(() => {
    const details = {
      about: user?.about || "Please edit your profile",
      culture: user?.culture || "Please edit your profile",
      benefits: user?.benefits || "Please edit your profile",
      hiring: user?.hiring || "Please edit your profile",
    };

    setActive(details["about"]);
    setDetails(details);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const objKeys = Object.keys(details);

  // find jobs related to this user
  const userJobs = allJobs?.filter((job) => job.userId === id);
  console.log(userJobs);

  if (isLoading) return "Loading...";
  if (isError) return "Something went wrong!!";

  return (
    <section className="size py-12">
      <div className="flex justify-between">
        <button
          onClick={() => navigate(-1)}
          className="mb-12 bg-orang py-1 px-4 text-white rounded-md hover:bg-orange-400"
        >
          <ArrowBackIosNewIcon sx={{ fontSize: "0.9rem" }} /> Back To All Jobs
        </button>
        {user?._id === users._id && (
          <span
            onClick={() => {
              setUserData(user);
              navigate(`/editCompany/${user?._id}`);
            }}
            className="ml-6 cursor-pointer flex gap-2 text-gray-600 hover:text-black"
          >
            Edit
            <EditIcon sx={{ fontSize: "1.2rem" }} />
          </span>
        )}
      </div>

      <div className="flex gap-[3rem] flex-col lg:flex-row">
        <div
          className="flex-1 bg-slate-100 flex-col pt-7 pb-4
          shadow-md shadow-gray-300 hidden lg:flex h-full"
        >
          <div>
            <img
              className="w-[6rem] h-[6rem] object-cover rounded-full border-2 border-gray-200 mx-auto"
              src="https://t4.ftcdn.net/jpg/02/90/27/39/360_F_290273933_ukYZjDv8nqgpOBcBUo5CQyFcxAzYlZRW.jpg"
              alt="user"
            />
          </div>
          <div className="px-8">
            <Detail title="HQ" desc={user?.HQ || "company add"} />
            <div className="pb-3 font-bold !font-poppins text-lg">
              <a href={user?.website}>Website</a>
            </div>
            <Detail title="Industry" desc={user?.industry || "industry"} />
            <Detail
              title="Established"
              desc={user?.established || "Established"}
            />
            <Detail title="Sizes" desc={user?.size || "1 - 5 Seats"} />
          </div>
        </div>

        <div className="flex-[3] ">
          <div className="hidden lg:flex justify-between pb-[2rem] ">
            <div>
              <h1 className="text-3xl font-medium capitalize !font-poppins">
                {user?.company_name || "Your Company Name"}
              </h1>
              <p
                className="uppercase text-gray-500 font-normal !font-poppins
                pt-2"
              >
                jobs posted 135
              </p>
            </div>
            <div className="flex gap-1">
              <a href={user?.linkedIn}>
                <LinkedInIcon />
              </a>
              <a href={user?.twitter}>
                <TwitterIcon />
              </a>

              <a href={user?.telegram}>
                <TelegramIcon />
              </a>
            </div>
          </div>

          <div className="lg:hidden">
            <ResponsiveDetails />
          </div>

          <div
            className="bg-slate-100 px-[1rem] lg:px-[4rem] py-[2rem] shadow-md shadow-gray-300
          border-t border-gray-300 lg:border-none"
          >
            <div className="flex gap-[2rem] md:gap-[4rem] items-center lg:justify-between capitalize">
              {objKeys.map((key, i) => (
                <span
                  key={i}
                  onClick={() => setActive(details[key])}
                  className={`cursor-pointer relative before:content-[''] before:bottom-[-0.2rem]
                  before:left-0 before:right-0 before:border before:border-black before:absolute before:scale-0
                  ${active === details[key] && "before:scale-100"}
                  hover:before:scale-100 before:transition-all before:duration-500 before:origin-left`}
                >
                  {key}
                </span>
              ))}
            </div>
            <div
              className="pt-8 first-letter:capitalize"
              dangerouslySetInnerHTML={{ __html: active }}
            />
          </div>

          {/* all jobs posted  */}
          <div className="mt-6">
            <h1 className="py-4 text-[1.5rem]">All Jobs Posted</h1>
            <div className="flex flex-col gap-5">
              {userJobs?.map((job, i) => (
                <Job job={job} key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyProfile;
