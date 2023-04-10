import React from "react";
import ProfileDetails from "./ProfileDetails/ProfileDetails";
import Password from "./Password/Password";

const Details = () => {
  return (
    <section className="flex gap-5">
      <div className="flex-1">
        <ProfileDetails />
      </div>

      <div className="flex-1">
        <Password />
      </div>
    </section>
  );
};

export default Details;
