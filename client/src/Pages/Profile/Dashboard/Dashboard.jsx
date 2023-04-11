import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import GroupIcon from "@mui/icons-material/Group";
import Person2Icon from "@mui/icons-material/Person2";
import PersonIcon from "@mui/icons-material/Person";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Button } from "@mui/material";

const Dashboard = () => {
  return (
    <section className="pt-2">
      <div className="flex items-center gap-3 py-3 border-b border-gray-400 px-[1.2rem]">
        <img
          src="https://www.libera.fi/wp-content/uploads/2019/02/blank-profile-picture-973460__480.png"
          alt="profile"
          className="w-[4rem] h-[4rem] object-cover rounded-full"
        />
        <div className="flex flex-col gap-1">
          <p className="font-bold">John Williams</p>
          <p className="text-gray-400 1114:text-sm">Software Engineer</p>
        </div>
      </div>
      {/* buttons  */}
      <div className="flex flex-col">
        <PageButton
          icon={<DashboardIcon sx={{ fontSize: "1.1rem" }} />}
          text="dashboard"
        />
        <PageButton
          icon={<ManageAccountsIcon sx={{ fontSize: "1.1rem" }} />}
          text="Manage Job Post"
        />
        <PageButton
          icon={<PeopleAltIcon sx={{ fontSize: "1.1rem" }} />}
          text="Manage Jobs"
        />
        <PageButton
          icon={<Person2Icon sx={{ fontSize: "1.1rem" }} />}
          text="my profile"
        />
        <PageButton
          icon={<PowerSettingsNewIcon sx={{ fontSize: "1.1rem" }} />}
          text="logout"
        />
      </div>
    </section>
  );
};

export default Dashboard;

const PageButton = ({ icon, text }) => {
  return (
    <Button
      className="!flex !gap-3 !justify-start !items-center !py-3 !border-b 
    !border-gray-400 !text-white group !capitalize hover:!bg-white/10">
      <span
        className="group-hover:bg-orang p-1 rounded-full bg-white/10
        w-[2rem] h-[2rem] grid place-items-center">
        {icon}
      </span>
      <span className="mt-1">{text}</span>
    </Button>
  );
};
