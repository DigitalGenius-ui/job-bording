import React, { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import UserProfile from "./UserProfile";
import MenuIcon from "@mui/icons-material/Menu";
import { JobContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

const Link = ({ title, path }) => {
  const navigate = useNavigate();
  const { setOpen, user } = JobContext();
  const pathName = window.location.pathname;

  const handleClick = () => {
    navigate(path);
    if (path === "/addJob") {
      return user ? navigate(path, { replace: true }) : setOpen(true);
    } else if (path === "/jobPosts") {
      return user ? navigate(path, { replace: true }) : setOpen(true);
    }
  };
  return (
    <span
      onClick={handleClick}
      className={`cursor-pointer py-3 px-6 border-b border-menuBorder hover:bg-gray-600
      lg:py-1 lg:px-2 rounded-sm lg:hover:bg-orange-50 
      ${
        path === pathName
          ? "bg-white/10 lg:bg-orange-50 text-orang"
          : "text-gray-400 lg:text-gray-500 bg-transparent"
      }`}>
      {title}
    </span>
  );
};

const Header = () => {
  const [menu, setMenu] = useState(false);
  const { setOpen, user } = JobContext();

  const navigate = useNavigate();
  const homeClick = () => {
    navigate("/");
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className="shadow-sm shadow-gray-200 bg-white sticky top-0 z-50">
      <section className="size flex items-center justify-between h-[85px]">
        <div className="flex-1 flex items-center gap-10">
          {/* logo part  */}
          <div onClick={homeClick}>
            <img
              className="w-32 sm:w-44 cursor-pointer"
              src="/images/logo.png"
              alt=""
            />
          </div>

          {/* navigation part  */}
          <nav
            className={`text-md capitalize flex w-[90%] lg:w-[24rem] fixed flex-col bg-menuBg 
            left-0 top-0 bottom-0 lg:static lg:flex-row z-50 ${
              menu ? "translate-x-0" : "translate-x-[-100%] lg:translate-x-0"
            } transition-all duration-500
            lg:bg-transparent lg:items-center lg:justify-between lg:w-[60%]`}>
            <h1 className="text-white lg:hidden text-center py-4 border-b border-menuBorder">
              Menu
            </h1>
            <Link path="/" title="home" />
            <Link path="/jobPosts" title="find a job" />
            {user?.signupAs === "Employer" && (
              <Link path="/addJob" title="post a job" />
            )}
            <Link path="/blog" title="blog" />
            {user?.signupAs !== "Employer" && (
              <Link path="/about" title="about us" />
            )}
            <Link path="/contact" title="contact us" />
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {!user && (
            <button
              className="flex items-center gap-2 bg-orang text-white py-2 px-2 md:py-2 md:px-4 rounded-full
            hover:bg-transparent border-2 border-orang hover:text-orang transition
            duration-500"
              onClick={() => setOpen(true)}>
              <LoginIcon sx={{ fontSize: "1.2rem" }} />
              <span className="hidden md:flex">Sign In</span>
            </button>
          )}

          {/* user profile dropdown part   */}
          <UserProfile />

          {/* bar part  */}
          <span
            onClick={() => setMenu((prev) => !prev)}
            className="w-[2.5rem] h-[2.5rem] grid place-items-center text-white
            bg-orang lg:hidden rounded-full">
            <MenuIcon sx={{ fontSize: "2rem" }} />
          </span>
        </div>
      </section>
    </header>
  );
};

export default Header;
