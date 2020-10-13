import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import classNames from "classnames";

import "./Loader.css";

export const Loader = ({ fullPage }) => {
  return (
    <div className={classNames("loader-container", { "loader-container--full": fullPage })}>
      <ClipLoader size={64} color={"#123abc"} loading={true} />
    </div>
  );
};
