import React from "react";
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="layer fixed inset-0 !max-w-['100vw'] !z-50 bg-white">
      <div className="loading">
        <div className="ball one"></div>
        <div className="ball two"></div>
        <div className="ball three"></div>
        <div className="ball four"></div>
      </div>
    </div>
  );
};

export default Loading;
