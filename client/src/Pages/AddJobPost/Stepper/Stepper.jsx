import React, { useEffect, useState } from "react";
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
import { postJob } from "../../../FetchHook/Job";

const steps = ["Position", "Company", "Preview", "Post"];

const StepperComp = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const { user } = JobContext();

  // data states
  const { setAlert } = JobContext();
  const [validate, setValidate] = useState(false);
  let [aboutPosition, setAboutPosition] = React.useState({
    userId: user._id,
    job_title: "",
    category: "Design",
    job_type: "Full-Time",
    position_accross_globe: "No",
    salary_range: "25,999 - 50,999",
    country: "Remote",
    state: "Remote",
    application_link_or_email: "",
    job_description: "",
  });

  const [aboutCompany, setAboutCompany] = React.useState({
    job_posted_before: "No",
    email_id: "something@something.com",
    company_name: "",
    company_hq: "",
    company_mission_vission: "",
    company_website: "https://",
    company_description: "",
  });

  // handle scroll up
  const handleScroll = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  // errorHandling
  const inputValidate = (input) => {
    return new Promise((resolve, reject) => {
      if (Object.keys(input).every((k) => input[k] !== "")) {
        resolve("Operation id done successfully");
        setValidate(false);
      } else {
        setValidate(true);
        reject("Operation was rejected");
      }
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
  }, [validate, setAlert, error?.msg, isError]);

  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setSkipped(newSkipped);

    if (activeStep === 0) {
      inputValidate(aboutPosition)
        .then((data) => {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          handleScroll();
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (activeStep === 1) {
      inputValidate(aboutCompany)
        .then((data) => {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          handleScroll();
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (activeStep === 2) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      handleScroll();
    }

    if (activeStep === 3) {
      const data = {
        ...aboutPosition,
        ...aboutCompany,
      };

      await mutateAsync(data);
      window.location.replace("/jobPosts");
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
              aboutPosition={aboutPosition}
              setAboutPosition={setAboutPosition}
              validate={validate}
            />
          ) : activeStep === 1 ? (
            <Company
              aboutCompany={aboutCompany}
              setAboutCompany={setAboutCompany}
              validate={validate}
            />
          ) : activeStep === 2 ? (
            <Preview
              aboutCompany={aboutCompany}
              aboutPosition={aboutPosition}
            />
          ) : (
            <PostInfo />
          )}

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
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

export default StepperComp;
