import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HambugerMenu from "./plugins/HamburgerMenu";
import dm from "../assets/dm.png";
import $ from 'jquery';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUser } from "../redux/actions/authAction";
const Navbar = ({ handlCallBack, checked }) => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authState)



  const [doctorDetails, setDoctorDetails] = useState({});


  useEffect(() => {
    setDoctorDetails(user);
  }, [user])


  useEffect(() => {
    dispatch(getUser());
  }, [dispatch])

  useEffect(() => {
    $('.dropdown-toggle').dropdown();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("Token removed, user logged out.");
    const token = localStorage.getItem("token") || "";
    if (token == '') {
      toast.success('Logged out.');
      dispatch(getUser());
    }
  };


  return (
    <>

      {/* style  */}
      <style>
        {`
          .btn-profile .dropdown-item:active{
            color: black;
            text-decoration: none;
            background-color: #8ddee5 !important;
          }
          .btn-profile .dropdown-toggle::after {
            display: inline-block;
            margin-left: .255em;
            vertical-align: .255em;
            content: none !important; 
            display: none !important;
            border-top: .3em solid;
            border-right: .3em solid transparent;
            border-bottom: 0;
            border-left: .3em solid transparent;
        }
        `}
      </style>

      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
        <div className="container-fluid ">
          <HambugerMenu onClick={handlCallBack} checked={checked} />
          <p className="fw-bold m-0 h4 justify-content-center ">
            {" "} Doctor Panel {" "}
          </p>
          {/* <p className="fw-bold m-0 h4  ">
            <button className="btn btn-danger"  disabled>test submit report</button>
          </p> */}

          {/* <div className="">
            <ul className="ms-auto mb-2 mb-lg-0 list-unstyled">
              <li className="nav-items  dropdown dropstart">
                <div
                  type="button"
                  className="btn dropdown-toggle rounded-circle"
                  data-toggle="dropdown"
                  aria-expanded="false"
                  alt="Logo"
                >
                  <img src={dm}
                    style={{ width: "50px" }}
                    className="rounded-circle shadow "



                  />
                </div>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Separated link
                  </a>
                </div>
              </li>
            </ul>
          </div> */}


          <div className="btn-group btn-profile mx-1 mx-md-1 my-1">

            <button type="button" className="dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-expanded="false" data-reference="parent" style={{ border: "none", backgroundColor: 'white' }}>
              <img src={dm} style={{ width: "50px" }} className="rounded-circle shadow " />
            </button>
            <div className="dropdown-menu" style={{ right: '0px', float: 'right', left: 'unset' }}>
              {/* <a className="dropdown-item" href="#">DID: 001</a> */}
              <a className="dropdown-item" href="#">Name:{doctorDetails?.name}</a>
              <a className="dropdown-item disabled" href="#" >Report Submit</a>
              {/* <a className="dropdown-item" href="#">Profile Details</a> */}
              <div className="dropdown-divider"></div>
              <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-outline-info" onClick={handleLogout} >Logout Here</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
