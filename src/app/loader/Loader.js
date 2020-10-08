import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

import "./Loader.css";

export const Loader = () => {
  return (
    <div className="loader-container">
      <ClipLoader size={64} color={"#123abc"} loading={true} />
    </div>
  );
};
