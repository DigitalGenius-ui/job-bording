import React, { useState, useEffect } from "react";
import Input from "../util/Input/Input";
import { useMutation } from "react-query";
import { signUp } from "../FetchHook/User";
import { JobContext } from "../Context/Context";
import { Box, CircularProgress } from "@mui/material";

const Register = () => {
  const { setActiveForm, setAlert } = JobContext();
  const [register, setRegister] = useState({
    fullName: "",
    email: "",
    password: "",
    rePassword: "",
    signupAs: "",
  });

  const { mutateAsync, isLoading, error, isError } = useMutation(
    "signup",
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
        className="flex flex-col px-3 lg:px-6 gap-4"
      >
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
        <Input
          type="text"
          placeHolder="Sign Up As"
          setValue={setRegister}
          name="signupAs"
        />

        <p className="flex items-center gap-2 flex-wrap text-sm md:text-md">
          <input type="checkbox" />I Have Read and Agree to the
          <span className="text-orang cursor-pointer">Terms & Conditions</span>
        </p>

        <button
          className={`bg-orang w-full py-3 mb-4 rounded-md text-white
        hover:bg-orange-400 flex items-center justify-center gap-2
        ${isLoading && "pointer-events-none"}`}
        >
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
