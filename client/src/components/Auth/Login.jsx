import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineGoogle } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";

const Login = () => {
  return (
    <>
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold">Welcome Back Sign in to Continue</h1>
        <p className="pt-2 text-gray-500">
          Don't Have an Account?
          <span className="text-orang cursor-pointer"> Sign Up!</span>
        </p>
      </div>

      <form className="flex flex-col px-6 gap-4">
        <input
          className="border p-3 text-sm outline-none"
          type="email"
          placeholder="Email Address"
        />
        <input
          className="border p-3 text-sm outline-none"
          type="password"
          placeholder="Password"
        />

        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="text-sm md:text-md">
            <input type="checkbox" />
            <span className="ml-2">Remember Me</span>
          </div>
          <p className="text-sm hover:text-orang cursor-pointer">
            Forget Password?
          </p>
        </div>

        <button
          className="bg-orang w-full py-3 mb-2 rounded-md text-white
        hover:bg-orange-400"
        >
          Log In
        </button>
      </form>

      <div className="px-6 mb-5">
        <div
          className="text-center mt-3 relative after:content-[''] after:left-0 after:right-0
            after:border after:absolute after:top-[43%] after:z-[-1]"
        >
          <span className="max-auto bg-gray-200 text-black p-1 rounded-full z-30 px-3">
            Or Login in With
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 mt-5 flex-wrap md:flex-nowrap">
          <button className="bg-blue-500 text-white border-blue-500 hover:text-blue-500 social_button">
            <FaFacebookF /> Facebook
          </button>
          <button className="bg-red-700 border-red-700 hover:text-red-700 social_button">
            <AiOutlineGoogle /> Google
          </button>
          <button className="bg-sky-500 border-sky-500 hover:text-sky-700 social_button">
            <BsTwitter /> Twitter
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
