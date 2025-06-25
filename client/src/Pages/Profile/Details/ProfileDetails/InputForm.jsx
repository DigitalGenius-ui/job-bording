import React from "react";
import Inputs from "../../util/Inputs";
import { UserContext } from "../../../../Context/Context";
import { downloadResume, removeResume } from "../../../../api-calls/user-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";

const InputForm = ({ update, register, errors, user }) => {
  const { profile, setAlert, currentUser } = UserContext();
  const { _id } = profile;

  // download resume
  const { mutateAsync, isLoading, isError } = useMutation({
    mutationFn: async () => await downloadResume(_id),
  });

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
  } = useMutation({
    mutationKey: ["users", _id],
    mutationFn: async () => await removeResume(_id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
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
            user?.signupAs === "Employer" ? "Company Name" : "Your Name"
          }`}
          type="text"
          name="fullName"
          update={update}
          register={register}
          errors={errors}
        />
        <Inputs
          label="Phone Number"
          type="text"
          name="phoneNumber"
          register={register}
          update={update}
          errors={errors}
        />
      </div>
      <Inputs
        label="Email Address"
        type="email"
        name="email"
        update={update}
        register={register}
        errors={errors}
      />
      <div>
        <Inputs
          label={
            user?.signupAs === "Employer"
              ? "Company Description"
              : "Career Objective"
          }
          type="textarea"
          name="notes"
          register={register}
          update={update}
          errors={errors}
        />
      </div>
      {/* add and update resume  */}
      {user?.signupAs === "Candidate" && update && (
        <Inputs
          label={`${user?.resume ? "Update" : "Upload"} Your Resume`}
          type="file"
          name="resume"
          update={update}
          accept=".pdf,.doc,.docx"
          register={register}
          errors={errors}
        />
      )}
      {user?.resume && (
        <div className="flex items-center justify-between">
          <span
            className="cursor-pointer w-fit hover:text-orange-800"
            onClick={() => handleDownload(_id)}
          >
            {isLoading ? "Loading..." : "Download CV"}
          </span>

          {/* remove resume  */}
          {update && (
            <div className="flex items-center gap-1">
              <span
                onClick={removeCV}
                className="cursor-pointer hover:text-orange-800 text-sm"
              >
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
