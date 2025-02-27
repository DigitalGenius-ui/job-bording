import React, { useEffect, useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Person2Icon from "@mui/icons-material/Person2";
import Person4Icon from "@mui/icons-material/Person4";
import { JobContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import male from "../../images/male.jpg";
import female from "../../images/female.jpg";
import noneGender from "../../images/question.png";

const UserProfile = () => {
  const [drop, setDrop] = useState(false);
  const { user, setOpen, allUser } = JobContext();
  const navigate = useNavigate();
  const selectRef = useRef();

  const currentUser = allUser?.find((userId) => userId?._id === user?._id);

  const folder = process.env.REACT_APP_FOLDER;

  const handleClick = (path) => {
    navigate(path);
    setDrop(false);
  };

  const logOut = () => {
    localStorage.clear();
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    window.location.reload();
  };

  useEffect(() => {
    const outSideClick = (e) => {
      if (!selectRef.current?.contains(e.target)) {
        setDrop(false);
      }
    };

    document.addEventListener("mousedown", outSideClick);
    return () => {
      document.removeEventListener("mousedown", outSideClick);
    };
  }, []);

  return (
    <div className="flex items-center gap-4 cursor-pointer relative">
      <div
        onClick={() => (user ? setDrop(!drop) : setOpen(true))}
        className="relative">
        {user ? (
          currentUser?.userProfile ? (
            <img
              className="w-11 h-11 object-cover rounded-full border-2 border-gray-200"
              src={folder + currentUser?.userProfile}
              alt="user"
            />
          ) : user?.signupAs === "Employer" ? (
            <div
              className="w-11 h-11 object-cover rounded-full border-2 border-gray-200
              text-[0.4rem] flex items-center justify-center text-center">
              COMPANY <br /> PROFILE
            </div>
          ) : (
            <img
              className="w-11 h-11 object-cover rounded-full border-2 border-gray-200"
              src={
                currentUser?.gender === "male"
                  ? male
                  : currentUser?.gender === "female"
                  ? female
                  : currentUser?.gender === "male"
                  ? male
                  : currentUser?.gender === "female"
                  ? female
                  : noneGender
              }
              alt="user"
            />
          )
        ) : (
          <img
            className="w-11 h-11 object-cover rounded-full border-2 border-gray-200"
            src="https://www.libera.fi/wp-content/uploads/2019/02/blank-profile-picture-973460__480.png"
            alt="user"
          />
        )}

        {/* user online sign  */}
        {user ? (
          <span
            className="w-[12px] h-[12px] bg-green rounded-full absolute
              border-2 border-gray-200 top-0 right-0"></span>
        ) : (
          <span
            className="w-[12px] h-[12px] bg-gray-500 rounded-full absolute
              border-2 border-gray-200 top-0 right-0"></span>
        )}
      </div>

      {/* user details  */}
      <h1 className="text-gray-500 font-semibold">
        <div className="hidden md:flex capitalize">
          Hi, {user?.fullName || "User"}
          <span>
            {drop ? (
              <KeyboardArrowUpIcon sx={{ fontSize: "1.2rem" }} />
            ) : (
              <KeyboardArrowDownIcon sx={{ fontSize: "1.2rem" }} />
            )}
          </span>
        </div>
      </h1>

      {/* drop down  */}
      {drop && (
        <div
          ref={selectRef}
          className="bg-white absolute right-0 flex flex-col top-full shadow-sm 
        shadow-gray-800 w-[15rem] mt-2 animate-dropDown transition-all duration-500">
          <Button
            title="My Profile"
            handleClick={() => {
              navigate(`/profile/${user._id}`);
              setDrop(false);
            }}
            icon={<Person2Icon sx={{ fontSize: "1.3rem" }} />}
          />
          {user?.signupAs === "Employer" && (
            <Button
              title="About Us"
              handleClick={() => {
                handleClick("/");
                setDrop(false);
              }}
              icon={<Person4Icon sx={{ fontSize: "1.3rem" }} />}
            />
          )}
          <Button
            title="LogOut"
            handleClick={logOut}
            icon={<ExitToAppIcon sx={{ fontSize: "1.2rem" }} />}
          />
        </div>
      )}
    </div>
  );
};

export default UserProfile;

const Button = ({ icon, title, handleClick }) => {
  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-2 py-2 px-2 cursor-pointer
        hover:text-orang border-b text-sm text-gray-500">
      <span>{icon}</span>
      {title}
    </div>
  );
};
