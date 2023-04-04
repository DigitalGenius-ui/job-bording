import React, { useState } from "react";
import { Button, Step, StepLabel, Stepper } from "@mui/material";
import StepOne from "../Steps/StepOne";
import StepTow from "../Steps/StepTow";
import FinalStep from "../Steps/FinalStep";

const EditCompany = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState({
    company_name: "Milad",
    HQ: "Australia",
    established: "2007",
    industry: "Web Development",
    size: "1 - 5",
    about: "something",
    website: "somthing.com",
    linkedIn: "somthing.com",
    twitter: "somthing.com",
    telegram: "somthing.com",
    culture: "ggggg",
    benefits: "sdfasdf",
    hiring: "sdfasdfggg",
  });

  const handleSubmit = () => {
    setActiveStep(activeStep + 1);
    if (activeStep > 1) {
      console.log(data);
    }
  };
  return (
    <section className="size shadowCard2 my-[2rem] p-8 lg:p-14 flex flex-col gap-3">
      <h1 className="text-2xl pb-6 text-center">Edit Your Profile</h1>
      <Stepper activeStep={activeStep}>
        <Step>
          <StepLabel>Step One</StepLabel>
        </Step>
        <Step>
          <StepLabel>Step Two</StepLabel>
        </Step>
        <Step>
          <StepLabel>Final Step</StepLabel>
        </Step>
      </Stepper>
      {activeStep === 0 ? (
        <StepOne data={data} setData={setData} />
      ) : activeStep === 1 ? (
        <StepTow data={data} setData={setData} />
      ) : (
        <FinalStep data={data} setData={setData} />
      )}

      <div className="flex justify-between mt-4">
        <Button
          disabled={activeStep < 1}
          type="submit"
          onClick={() => setActiveStep(activeStep - 1)}
        >
          Back
        </Button>
        <Button type="submit" onClick={handleSubmit}>
          {activeStep > 1 ? "Edit" : "Next"}
        </Button>
      </div>
    </section>
  );
};

export default EditCompany;
