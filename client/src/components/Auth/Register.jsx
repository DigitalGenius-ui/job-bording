import React, { useState, useEffect } from "react";
import Input from "../util/Input/Input";
import { useMutation } from "react-query";
import { signUp } from "../../FetchHook/User";
import { JobContext } from "../../Context/Context";
import { Box, CircularProgress } from "@mui/material";
import Select from "../util/Select/Select";

const Register = () => {
  const { setActiveForm, setAlert } = JobContext();
  const [register, setRegister] = useState({
    fullName: "",
    email: "",
    password: "",
    rePassword: "",
    signupAs: "",
    website: "",
    userProfile: "",
    gender: "",
    phoneNumber: "",
    notes: "",
    portfolio: "",
    resume: "",
    linkedIn : "",
    twitter : "",
    telegram : "",
    acceptTerm: false,
  });

  const { mutateAsync, isLoading, error, isError } = useMutation(
    "users",
    signUp,
    {
      onSuccess: (data) => {
        return data;
      },
    }
  );

  useEffect(() => {
    if (isError) {
      setAlert({
        type: "error",
        message: error && error.message,
        open: true,
      });
    }
  }, [setAlert, error, isError]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (register.password !== register.rePassword) {
      setAlert({
        type: "error",
        message: "Your passwords are not matching",
        open: true,
      });
      return;
    }

    if (!register.signupAs) {
      setAlert({
        type: "error",
        message: "Please fill the select input",
        open: true,
      });
      return;
    }

    if (register?.acceptTerm === false) {
      setAlert({
        type: "error",
        message: "You must accept the terms and conditions!!",
        open: true,
      });
      return;
    }

    await mutateAsync(register);
    setActiveForm(true);
    setAlert({
      type: "success",
      message: "User has been successfully created",
      open: true,
    });
  };

  return (
    <>
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold">Create your Account!</h1>
        <p className="pt-2 text-gray-500">
          If you Have an Account
          <span className="text-orang cursor-pointer"> Login</span>
        </p>
      </div>

      <form
        onSubmit={submitHandler}
        className="flex flex-col px-3 lg:px-6 gap-4">
        <Input
          type="text"
          placeHolder="User Name"
          setValue={setRegister}
          name="fullName"
        />
        <Input
          type="email"
          placeHolder="Email Address"
          setValue={setRegister}
          name="email"
        />
        <Input
          type="password"
          placeHolder="Password"
          setValue={setRegister}
          name="password"
        />
        <Input
          type="password"
          placeHolder="Repeat Password"
          setValue={setRegister}
          name="rePassword"
        />

        <Select
          placeHolder="Sign UpAs..."
          data={["Employer", "Candidate"]}
          form="auth"
          onChange={setRegister}
        />

        <p className="flex items-center gap-2 flex-wrap text-sm md:text-md">
          <input
            type="checkbox"
            value={register?.acceptTerm}
            onChange={() =>
              setRegister((prev) => ({
                ...prev,
                acceptTerm: !prev?.acceptTerm,
              }))
            }
          />
          I Have Read and Agree to the
          <span className="text-orang cursor-pointer">Terms & Conditions</span>
        </p>

        <button
          className={`bg-orang w-full py-3 mb-4 rounded-md text-white
        hover:bg-orange-400 flex items-center justify-center gap-2
        ${isLoading && "pointer-events-none"}`}>
          {isLoading && (
            <Box sx={{ display: "flex", marginTop: "0.2rem" }}>
              <CircularProgress size="1rem" />
            </Box>
          )}
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
