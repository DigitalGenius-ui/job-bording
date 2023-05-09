import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";

const Preview = ({ jobForm }) => {
  return (
    <section>
      <h1 className="text-center text-2xl py-8">Preview job post</h1>
      <div className="flex flex-col-reverse lg:flex-row gap-8 mt-7">
        <div className="flex-[1.8]">
          <span className="text-sm font-bold">POSTED DATE: 03.03.2022</span>

          <div>
            <h1 className="pt-7 pb-3 text-3xl font-semibold">
              {jobForm.job_title}
            </h1>

            <div className="flex items-center gap-4 flex-wrap">
              <p className="border border-green py-2 px-3 rounded-full text-green text-sm">
                {jobForm.category}
              </p>
              <p className="border border-green py-2 px-3 rounded-full text-green text-sm">
                {jobForm.job_type}
              </p>
              {jobForm.position_accross_globe === "Yes" && (
                <p className="border border-green py-2 px-3 rounded-full text-green text-sm">
                  {jobForm.country}
                </p>
              )}
              <p className="border border-green py-2 px-3 rounded-full text-green text-sm">
                {jobForm.salary_range}
              </p>
            </div>

            <div className="border my-12 p-5 ">
              <h1 className="text-xl font-bold">Company's Details</h1>

              <div
                className="mt-5"
                dangerouslySetInnerHTML={{
                  __html: jobForm.company_description,
                }}
              />

              <h1 className="pt-6 text-xl font-bold">Position's Details</h1>
              <div
                className="mt-5"
                dangerouslySetInnerHTML={{
                  __html: jobForm.job_description,
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-3xl">{jobForm.company_name}</h1>

          <div className="flex items-center gap-5 mt-3">
            <LocationOnIcon />
            <p>{jobForm.company_hq}</p>
          </div>

          <div className="flex items-center gap-5 mt-3">
            <LanguageIcon />
            <p>
              <a
                className="text-blue-600 hover:text-blue-400"
                target="blank"
                href={jobForm.company_website}>
                Company Website
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preview;
