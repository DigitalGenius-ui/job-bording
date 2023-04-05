import React, { useState } from "react";
import { Button, Step, StepLabel, Stepper } from "@mui/material";
import StepOne from "../Steps/StepOne";
import StepTow from "../Steps/StepTow";
import FinalStep from "../Steps/FinalStep";
import { JobContext } from "../../../../Context/Context";
import { useMutation, useQueryClient } from "react-query";
import { updateUser } from "../../../../FetchHook/User";
import { useNavigate } from "react-router-dom";

const EditCompany = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { userData, setUserData } = JobContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isError, isLoading } = useMutation(updateUser, {
    onSuccess: () => queryClient.invalidateQueries("users"),
  });

  const handleSubmit = () => {
    setActiveStep(activeStep + 1);
    if (activeStep > 1) {
      mutate(userData);
      navigate(`/companyProf/${userData._id}`);
    }
  };

  if (isLoading) return "Loading...";
  if (isError) return "Something went wrong!!";

  return (
    <section className="size shadowCard2 my-[2rem] p-6 lg:p-14 flex flex-col gap-3">
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
        <StepOne data={userData} setData={setUserData} />
      ) : activeStep === 1 ? (
        <StepTow data={userData} setData={setUserData} />
      ) : (
        <FinalStep data={userData} setData={setUserData} />
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
