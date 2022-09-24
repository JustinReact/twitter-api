import React from "react";
import "./styles.scss";

export const StyledLoader = ({ style }) => {
  return (
    <div className="styled-loader" style={{ ...style }}>
      <div className="styled-spinner">Loading...</div>
    </div>
  );
};
