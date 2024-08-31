import React from "react";
import "./style.scss";
const HambugerMenu = ({checked, onClick}) => {
  return (
    <div className="hamburger-menu" onClick={onClick}>
      <label htmlFor="check">
        <input type="checkbox" id="check" checked={checked} />
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
  );
};

export default HambugerMenu;