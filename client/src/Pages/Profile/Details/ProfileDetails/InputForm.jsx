import React from "react";
import Inputs from "../../util/Inputs";
import { JobContext } from "../../../../Context/Context";

const InputForm = ({ update, currentUser }) => {
  const { setProfile, profile } = JobContext();

  return (
    <div className="pt-[2rem] flex flex-col gap-5">
      <div className="flex flex-col md:flex-row lg:flex-col gap-5">
        <Inputs
          label={`${
            currentUser?.signupAs === "Employer" ? "Company Name" : "Your Name"
          }`}
          type="text"
          name="fullName"
          errorMsg="Full Name is required!!!"
          required={true}
          update={update}
          onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
          value={profile.fullName}
        />
        <Inputs
          label="Phone Number"
          type="text"
          name="phoneNumber"
          errorMsg="Invalid Phone Number"
          required={true}
          pattern="^\+(?:[0-9] ?){6,14}[0-9]$"
          update={update}
          onChange={(e) =>
            setProfile({ ...profile, phoneNumber: e.target.value })
          }
          value={profile.phoneNumber || "+1"}
        />
      </div>
      <Inputs
        label="Email Address"
        type="email"
        name="email"
        errorMsg="Email is required!!!"
        update={update}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        required={true}
        value={profile.email}
      />
      <div>
        <Inputs
          label={
            currentUser?.signupAs === "Employer"
              ? "Company Description"
              : "Career Objective"
          }
          type="textarea"
          name="notes"
          onChange={(e) => setProfile({ ...profile, notes: e.target.value })}
          update={update}
          errorMsg="This field must be a least 10 characters"
          value={profile.notes}
        />
      </div>

      {currentUser?.signupAs === "Candidate" && (
        <Inputs
          label="Upload Your Resume"
          type="file"
          name="resume"
          update={update}
          accept=".pdf,.doc,.docx"
          onChange={(e) =>
            setProfile({ ...profile, resume: e.target.files[0] })
          }
        />
      )}
    </div>
  );
};

export default InputForm;
