import React from "react";

const Detail = ({ title, desc }) => {
  return (
    <div className="text-xl font-medium capitalize w-[10rem]">
      <h1 className="text-gray-400 !font-poppins text-lg">{title}</h1>
      <p className="text-base leading-5 !font-poppins">{desc}</p>
    </div>
  );
};

const ResponsiveDetails = () => {
  return (
    <div className="bg-slate-100 pl-[1rem] shadow-md shadow-gray-300 ">
      <div className="flex-1 flex-col lg:items-center pt-7 pb-4 flex">
        <div className="flex gap-5 items-center">
          <img
            className="w-[6rem] h-[6rem] object-cover rounded-full border-2 border-gray-200"
            src="https://t4.ftcdn.net/jpg/02/90/27/39/360_F_290273933_ukYZjDv8nqgpOBcBUo5CQyFcxAzYlZRW.jpg"
            alt="user"
          />
          <div>
            <h1 className="text-3xl font-medium capitalize !font-poppins">
              Toggl
            </h1>
            <p
              className="uppercase text-gray-500 font-normal !font-poppins
                pt-2"
            >
              jobs posted 135
            </p>
          </div>
        </div>
        <div className="mt-8">
          <div className="flex gap-5 md:gap-10 flex-wrap">
            <Detail title="HQ" desc="Tallinn, Estonia" />
            <Detail title="Industry" desc="Internet Software & Services" />
            <Detail title="Established" desc="2007" />
          </div>
          <div className="flex gap-10 items-center flex-wrap mt-4">
            <Detail title="Sizes" desc="1 - 10 seats" />
            <div className="font-bold !font-poppins text-lg">
              <a href="/">Website</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveDetails;
