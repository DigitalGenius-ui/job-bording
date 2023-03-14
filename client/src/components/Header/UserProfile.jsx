import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Person2Icon from "@mui/icons-material/Person2";
import Person4Icon from "@mui/icons-material/Person4";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { JobContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [drop, setDrop] = useState(false);
  const { user } = JobContext();

  const dorpMenu = [
    {
      title: "My Profile",
      icon: <Person2Icon sx={{ fontSize: "1.3rem" }} />,
      path: "/",
    },
    {
      title: "Manage Jobs Post",
      icon: <PostAddIcon sx={{ fontSize: "1.3rem" }} />,
      path: "/addJob",
    },
    {
      title: "Manage Jobs",
      icon: <Person4Icon sx={{ fontSize: "1.3rem" }} />,
      path: "/jobPosts",
    },
  ];

  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(path);
    setDrop(false);

    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="flex items-center gap-4 cursor-pointer relative">
      <div onClick={() => setDrop(!drop)} className="relative">
        <img
          className="w-11 h-11 object-cover rounded-full border-2 border-gray-200"
          src="https://t4.ftcdn.net/jpg/02/90/27/39/360_F_290273933_ukYZjDv8nqgpOBcBUo5CQyFcxAzYlZRW.jpg"
          alt="user"
        />
        <span
          className="w-[12px] h-[12px] bg-green rounded-full absolute
              border-2 border-gray-200 top-0 right-0"
        ></span>
      </div>
      <h1 className="text-gray-500 font-semibold">
        <div className="hidden md:flex capitalize">
          Hi, {user?.signupAs || "User"}
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
          className="bg-white absolute right-0 flex flex-col top-full shadow-sm 
       shadow-gray-800 w-[15rem] mt-2 animate-dropDown transition-all duration-500"
        >
          {dorpMenu.map((menu, i) => (
            <div
              key={i}
              onClick={() => handleClick(menu.path)}
              className="flex items-center gap-2 py-2 px-2  cursor-pointer
              hover:text-orang border-b text-sm text-gray-500"
            >
              <span>{menu.icon}</span>
              {menu.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
