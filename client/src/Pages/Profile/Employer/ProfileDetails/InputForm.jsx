import React from "react";
import Inputs from "../../util/Inputs";
import { JobContext } from "../../../../Context/Context";
import { FormHelperText } from "@mui/material";

const InputForm = ({ error }) => {
  const { user, profile, handleChange, file, setFile } = JobContext();

  return (
    <div className="pt-[2rem] flex flex-col gap-5">
      <div className="flex flex-col md:flex-row lg:flex-col gap-8">
        <Inputs
          label="Your Name"
          type="text"
          onChange={handleChange}
          name="fullName"
          value={profile.fullName}
        />
        <Inputs
          label="Phone Number"
          type="text"
          onChange={handleChange}
          name="phoneNumber"
          value={profile.phoneNumber}
        />
      </div>
      <Inputs
        label="Email Address"
        type="email"
        onChange={handleChange}
        name="email"
        value={profile.email}
      />
      <div>
        <Inputs
          label={
            user.signupAs === "Employer"
              ? "Company Description"
              : "Career Objective"
          }
          type="textarea"
          onChange={handleChange}
          value={profile.notes}
          error={error}
        />
        <FormHelperText className="!text-red-700">
          {error && "This field is required!!"}
        </FormHelperText>
      </div>

      {user.signupAs === "Candidate" && (
        <Inputs
          label="Upload Your Resume"
          type="file"
          onChange={(e) => setFile(e.target.file[0])}
          value={file}
        />
      )}
    </div>
  );
};

export default InputForm;
