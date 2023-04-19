import React from "react";
import Inputs from "../../util/Inputs";
import { JobContext } from "../../../../Context/Context";

const InputForm = ({ update }) => {
  const { user, setProfile, profile } = JobContext();

  return (
    <div className="pt-[2rem] flex flex-col gap-5">
      <div className="flex flex-col md:flex-row lg:flex-col gap-5">
        <Inputs
          label="Your Name"
          type="text"
          name="fullName"
          errorMsg="Full Name is required!!!"
          required={true}
          header="My Profile Details"
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
          header="My Profile Details"
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
        header="My Profile Details"
        update={update}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        required={true}
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
          name="notes"
          header="My Profile Details"
          onChange={(e) => setProfile({ ...profile, notes: e.target.value })}
          update={update}
          errorMsg="This field must be a least 10 characters"
          value={profile.notes}
        />
      </div>

      {user.signupAs === "Candidate" && (
        <Inputs
          label="Upload Your Resume"
          type="file"
          name="resume"
          header="My Profile Details"
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
