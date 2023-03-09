import React, { useState } from "react";
import Select from "../Home/Banner/Select";

const Register = () => {
  const [select, setSelect] = useState("");

  const data = [
    "Web Designer",
    "Web Developer",
    "Graphic Designer",
    "PHP Developer",
    "IOS Developer",
    "Android Developer",
  ];
  return (
    <>
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold">Create your Account!</h1>
        <p className="pt-2 text-gray-500">
          If you Have an Account
          <span className="text-orang cursor-pointer"> Login</span>
        </p>
      </div>

      <form className="flex flex-col px-6 gap-4">
        <input
          className="border p-3 outline-none"
          type="text"
          placeholder="User Name"
        />
        <input
          className="border p-3 text-sm outline-none"
          type="email"
          placeholder="Email Address"
        />
        <Select
          placeHolder="Select Jobs"
          data={data}
          onChange={setSelect}
          form="auth"
        />
        <input
          className="border p-3 text-sm outline-none"
          type="password"
          placeholder="Password"
        />
        <input
          className="border p-3 text-sm outline-none"
          type="password"
          placeholder="Repeat Password"
        />

        <p className="flex items-center gap-2 flex-wrap text-sm md:text-md">
          <input type="checkbox" />I Have Read and Agree to the
          <span className="text-orang cursor-pointer">Terms & Conditions</span>
        </p>

        <button
          className="bg-orang w-full py-3 mb-4 rounded-md text-white
        hover:bg-orange-400"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
