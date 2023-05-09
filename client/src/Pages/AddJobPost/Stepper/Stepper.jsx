import React, { memo, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Position from "../Position";
import Company from "../Company";
import Preview from "../Preview";
import PostInfo from "../PostInfo";
import { JobContext } from "../../../Context/Context";
import { useMutation, useQueryClient } from "react-query";
import { postJob, updateSingleJob } from "../../../FetchHook/Job";
import { PostJobContexts } from "../../../Context/PostJobContext";
import { useNavigate } from "react-router-dom";

const steps = ["Position", "Company", "Preview", "Post"];

const StepperComp = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const {
    // update job post
    updateJob,
    // job post states
    jobForm,
    setJobForm,
    // get all jobs
    allJobs,
  } = PostJobContexts();
  const navigate = useNavigate();

  // data states
  const { setAlert } = JobContext();
  const [validate, setValidate] = useState(false);

  const jobPost = allJobs?.find((job) => job?._id === updateJob);

  useEffect(() => {
    if (jobPost) {
      setJobForm(jobPost);
    }
  }, [updateJob]);
  console.log(updateJob);

  // handle scroll up
  const handleScroll = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const isStepOptional = (step) => {
    return step === 2;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  // post job in the database
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading, isError, error } = useMutation(postJob, {
    onSuccess: () => queryClient.invalidateQueries("job"),
  });

  // update job post
  const { mutateAsync: updateMutate } = useMutation(updateSingleJob, {
    onSuccess: () => queryClient.invalidateQueries("job"),
  });

  // error handling for posting jobs
  useEffect(() => {
    if (validate) {
      setAlert({
        type: "error",
        message: "All Fields are required",
        open: true,
      });
      return;
    } else if (isError) {
      setAlert({
        type: "error",
        message: error?.msg,
        open: true,
      });
    }
  }, [validate, setAlert, isError, updateJob, error?.msg]);

  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setSkipped(newSkipped);

    if (activeStep === 0) {
      // validate the states
      if (
        !jobForm.job_title ||
        !jobForm.category ||
        !jobForm.job_type ||
        !jobForm.position_accross_globe ||
        !jobForm.salary_range ||
        !jobForm.country ||
        !jobForm.state ||
        !jobForm.application_link_or_email ||
        !jobForm.job_description ||
        !jobForm.keyword
      ) {
        setAlert({
          type: "error",
          message: "All Fields are required",
          open: true,
        });
        setValidate(true);
        return;
      }
      setValidate(false);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      handleScroll();
    }

    if (activeStep === 1) {
      if (
        !jobForm.job_posted_before ||
        !jobForm.email_id ||
        !jobForm.company_name ||
        !jobForm.company_hq ||
        !jobForm.company_mission_vission ||
        !jobForm.company_website ||
        !jobForm.company_description
      ) {
        setAlert({
          type: "error",
          message: "All Fields are required",
          open: true,
        });
        setValidate(true);
        return;
      }
      setValidate(false);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      handleScroll();
    }

    if (activeStep === 2) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      handleScroll();
    }

    if (activeStep === 3) {
      if (jobPost) {
        await updateMutate(jobForm);
        navigate("/jobPosts");
      } else {
        await mutateAsync(jobForm);
        navigate("/jobPosts");
      }
    }

    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            You've successfully advertised a new job after completing all steps.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 ? (
            <Position
              jobForm={jobForm}
              setJobForm={setJobForm}
              validate={validate}
            />
          ) : activeStep === 1 ? (
            <Company
              jobForm={jobForm}
              setJobForm={setJobForm}
              validate={validate}
            />
          ) : activeStep === 2 ? (
            <Preview jobForm={jobForm} />
          ) : (
            <PostInfo />
          )}

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {isLoading && "Loading..."}
              {activeStep === steps.length - 1 ? "Post" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default memo(StepperComp);
