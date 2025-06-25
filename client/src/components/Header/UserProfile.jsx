import React, { useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Person2Icon from "@mui/icons-material/Person2";
import Person4Icon from "@mui/icons-material/Person4";
import { UserContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import useClickOutside from "../../hooks/useClickOutside";
import { useClickError } from "../../hooks/useCreateData";
import { USER_KEY } from "../../constants/query-keys";
import { logout } from "../../api-calls/auth-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CompanyAvatar, UserAvatar } from "../../utils/Avatar";

const UserProfile = () => {
  const [drop, setDrop] = useState(false);

  const { setOpen, currentUser } = UserContext();
  const navigate = useNavigate();
  const selectRef = useRef();

  const userImg = currentUser?.profile?.userImg;

  const handleClick = (path) => {
    navigate(path);
    setDrop(false);
  };

  const queryClient = useQueryClient();

  const { mutateAsync, error, isError } = useMutation({
    mutationFn: logout,
    onSuccess: () => queryClient.setQueryData([USER_KEY], null),
  });

  const logOut = async () => {
    await mutateAsync();
    toast.success("User is logged out!");
  };

  // error handler
  useClickError({ isError, error });
  // click outside
  useClickOutside({ ref: selectRef, setState: setDrop });

  return (
    <div className="flex items-center gap-4 cursor-pointer relative">
      <div
        onClick={() => (currentUser ? setDrop(!drop) : setOpen(true))}
        className="relative"
      >
        {currentUser && (
          <>
            {currentUser?.signupAs === "Employer" ? (
              <CompanyAvatar userImg={userImg} />
            ) : (
              <UserAvatar profile={currentUser?.profile} />
            )}
          </>
        )}

        {/* user online sign  */}
        {currentUser ? (
          <span
            className="w-[12px] h-[12px] bg-green rounded-full absolute
              border-2 border-gray-200 top-0 right-0"
          ></span>
        ) : (
          <span
            className="w-[12px] h-[12px] bg-gray-500 rounded-full absolute
              border-2 border-gray-200 top-0 right-0"
          ></span>
        )}
      </div>

      {/* user details  */}
      <h1 className="text-gray-500 font-semibold">
        <div className="hidden md:flex capitalize">
          Hi, {currentUser?.fullName || "User"}
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
        shadow-gray-800 w-[15rem] mt-2 animate-dropDown transition-all duration-500"
        >
          <Button
            title="My Profile"
            handleClick={() => {
              navigate(`/profile/${currentUser._id}`);
              setDrop(false);
            }}
            icon={<Person2Icon sx={{ fontSize: "1.3rem" }} />}
          />
          {currentUser?.signupAs === "Employer" && (
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
        hover:text-orang border-b text-sm text-gray-500"
    >
      <span>{icon}</span>
      {title}
    </div>
  );
};
