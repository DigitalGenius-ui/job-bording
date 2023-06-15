import React from "react";
import Inputs from "../../util/Inputs";
import { JobContext } from "../../../../Context/Context";
import { downloadResume, removeResume } from "../../../../FetchHook/User";
import { useMutation, useQueryClient } from "react-query";
import DeleteIcon from "@mui/icons-material/Delete";

const InputForm = ({ update, currentUser }) => {
  const { setProfile, profile, setResume, setAlert } = JobContext();
  const { _id } = profile;

  // download resume
  const { mutateAsync, isLoading, isError } = useMutation(
    () => downloadResume(_id),
    { onSuccess: (data) => data }
  );

  // download user cv
  const handleDownload = async (id) => {
    try {
      const res = await mutateAsync(id);
      const blob = new Blob([res?.data], { type: res?.data.type });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = currentUser?.fullName + ".pdf";
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  // remove cv
  const queryClient = useQueryClient();
  const {
    mutateAsync: cvRemover,
    isLoading: cvLoading,
    isError: cvError,
  } = useMutation(["users", _id], () => removeResume(_id), {
    onSuccess: () => queryClient.invalidateQueries("users"),
  });

  const removeCV = async (id) => {
    try {
      await cvRemover(id);
      setAlert({
        type: "success",
        message: "CV has been removed successfully.",
        open: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (isError || cvError) return "Something went Wrong!!!";

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
      {/* add and update resume  */}
      {currentUser?.signupAs === "Candidate" && update && (
        <Inputs
          label={`${currentUser?.resume ? "Update" : "Upload"} Your Resume`}
          type="file"
          name="resume"
          update={update}
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0])}
        />
      )}
      {currentUser?._id === _id && currentUser?.resume && (
        <div className="flex items-center justify-between">
          <span
            className="cursor-pointer w-fit hover:text-orange-800"
            onClick={() => handleDownload(_id)}>
            {isLoading ? "Loading..." : "Download CV"}
          </span>

          {/* remove resume  */}
          {update && (
            <div className="flex items-center gap-1">
              <span
                onClick={removeCV}
                className="cursor-pointer hover:text-orange-800 text-sm">
                {!cvLoading ? (
                  <DeleteIcon
                    sx={{
                      fontSize: "1.2rem",
                      marginTop: "0.2rem",
                      pointerEvents: "none",
                    }}
                  />
                ) : (
                  "Removing"
                )}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InputForm;
