import React, { useEffect } from "react";
import StepperComp from "./Stepper/Stepper";

const JobPost = () => {
  return (
    <div className="size shadowCard2 my-[2rem] p-5 lg:p-14">
      <h1 className="text-2xl pb-6 text-center">Post a Job</h1>
      <StepperComp />
    </div>
  );
};

export default JobPost;
