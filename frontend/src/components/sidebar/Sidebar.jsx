import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { SidebarData } from "./SidebarData";

import logo from '../../assets/logo.png'

const Sidebar = ({ handleCloseSidebar }) => {
  const [test, setTest] = useState("Dashboard");
  const location = useLocation().pathname;

  return (
    <>
      <style>
        {`
          
          .actives {
            background-color: #ffffff70 !important;
            border-left: 5px solid #ffffff;
            border-radius: 0px !important;
          }
        `}
      </style>
      <div className="h-100 min-vh-100 p-0 bg-primary-green">
        <ul className="nav flex-column nav-pills">

          <li>
            <img src={logo} style={{ width: "200px" }} alt="logo" />
          </li>

          {SidebarData.map((val, key) => {
            const isActive = location.match(val.link) ? true : false;
            return (
              <li
                className="nav-item sidebar-nav-link"
                role="presentation"
                key={key}
                onClick={() => {
                  handleCloseSidebar();
                  setTest(val.title);
                }}
              >
                <Link
                  to={val.link}
                  className={`nav-link text-white ${isActive ? "actives" : ""}`}
                  id="v-pills-home-tab"
                  data-toggle="pill"
                  data-target="#v-pills-home"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-home"
                  aria-selected={true}
                >
                  {val.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
