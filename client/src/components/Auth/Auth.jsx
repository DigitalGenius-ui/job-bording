import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Register from "./Register";
import Login from "./Login";
import "./style.scss";
import CloseIcon from "@mui/icons-material/Close";
import { JobContext } from "../../Context/Context";

const Auth = () => {
  const { open, setOpen, activeForm, setActiveForm } = JobContext();
  const [activeBtn, setActiveBtn] = useState("Register");

  const btn = ["Log In", "Register"];

  const handleClick = (item) => {
    setActiveBtn(item);
    setActiveForm(item === "Register" ? false : true);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{ ...style, outline: "none" }}
          className="w-[90%] md:w-[35rem] bg-white rounded-md overflow-hidden"
        >
          <div className="flex items-center justify-between text-white text-lg">
            {/* close modal button  */}
            <span
              onClick={() => setOpen(false)}
              className="absolute right-0 w-[2rem] h-[2rem] bg-orang grid place-items-center
            top-0 cursor-pointer shadow-lg"
            >
              <CloseIcon />
            </span>

            {/* toggle buttons  */}
            {btn.map((item, i) => (
              <button
                onClick={() => handleClick(item)}
                key={i}
                className={`border-b-[1.7px] border-orang bg-orang flex-1 p-5 text-md font-semibold ${
                  activeBtn === item ? "bg-white text-orang" : ""
                } text-sm md:text-lg`}
              >
                {item}
              </button>
            ))}
          </div>

          {/*login and sing up forms *************************************************************88*/}
          {activeForm ? <Login /> : <Register />}
        </Box>
      </Modal>
    </>
  );
};

export default Auth;
