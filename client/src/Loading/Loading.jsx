import React from "react";
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="container !z-50">
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
