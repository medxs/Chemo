import React, { useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import imgs from "../assets/banner.jpg";
import medBox from "../assets/icon/medical-box.svg";
import calls from "../assets/icon/healthcare-call-center-icon.svg";
import doc from "../assets/icon/doctor-female-icon.svg";
import doctorImg from "../assets/doctor img.png";
import { Facebook, Instagram, TwitterX, Whatsapp } from "react-bootstrap-icons";
import bannerImg from "../assets/hero-bg.png";
const Home = () => {
  let imageStyle = {
    backgroundImage: `url(${imgs})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    color: "black",
  };

  const cardImgTop = {
    maxWidth: "100px",
    borderRadius: "50%",
    margin: "-50px auto 0",
    boxShadow: "0 8px 20px -4px #95abbb",
    width: "100px",
    height: "100px",
  };

  const card = {
    background: "#fff",
    boxShadow: "0 8px 30px -7px #c9dff0",
    margin: "0 20px",
    padding: "0 10px",
    borderRadius: "20px",
    border: "0",
  };

  return (
    <>
      {/* ========== hero banner ============= */}
      <section>
        <div className="hero_area">
          <div className="hero_bg_box">
            <img src={bannerImg} alt="" />
          </div>
          {/* <!-- header section strats --> */}
          <nav className="navbar navbar-expand-lg navbar-light bg-lights">
            <div className="container custom_nav-container">
              <a className="navbar-brand" href="#">
                <span>ISMO <span className="d-none d-sm-block"> Bio-Photonics </span> </span>

                {/* <!-- Navbar --> */}
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item active">
                    <Link className="nav-link" href="#">
                      Home <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#service">
                      Service
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#service1">
                      About Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="#">
                      Contact Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/register"}>
                      Register
                    </Link>
                  </li>
                  {/* <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                      to={"/register"}
                    >
                      Register
                    </Link>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" href="#">
                        Action
                      </Link>
                      <Link className="dropdown-item" href="#">
                        Another action
                      </Link>
                      <div className="dropdown-divider"></div>
                      <Link className="dropdown-item" href="#">
                        Something else here
                      </Link>
                    </div>
                  </li> */}
                  <li className="nav-item">
                    <Link className="nav-link" to={"/login"}>
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <section className="slider_section">
            <div
              id="customCarousel1"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-7">
                        <div className="detail-box">
                          <h1>We Provide Best Healthcare</h1>
                          <p>
                            Explicabo esse amet tempora quibusdam laudantium,
                            laborum eaque magnam fugiat hic? Esse dicta aliquid
                            error repudiandae earum suscipit fugiat molestias,
                            veniam, vel architecto veritatis delectus repellat
                            modi impedit sequi.
                          </p>
                          <div className="btn-box">
                            <a href="" className="btn1">
                              {" "}
                              Read More{" "}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-7">
                        <div className="detail-box">
                          <h1>Your Health Is Our Priority</h1>
                          <p>
                            Explicabo esse amet tempora quibusdam laudantium,
                            laborum eaque magnam fugiat hic? Esse dicta aliquid
                            error repudiandae earum suscipit fugiat molestias,
                            veniam, vel architecto veritatis delectus repellat
                            modi impedit sequi.
                          </p>
                          <div className="btn-box">
                            <a href="" className="btn1">
                              {" "}
                              Read More{" "}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-7">
                        <div className="detail-box">
                          <h1>We Provide Best Healthcare</h1>
                          <p>
                            Explicabo esse amet tempora quibusdam laudantium,
                            laborum eaque magnam fugiat hic? Esse dicta aliquid
                            error repudiandae earum suscipit fugiat molestias,
                            veniam, vel architecto veritatis delectus repellat
                            modi impedit sequi.
                          </p>
                          <div className="btn-box">
                            <a href="" className="btn1">
                              {" "}
                              Read More{" "}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ol className="carousel-indicators">
                <li
                  data-target="#customCarousel1"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li data-target="#customCarousel1" data-slide-to="1"></li>
                <li data-target="#customCarousel1" data-slide-to="2"></li>
              </ol>
            </div>
          </section>
        </div>
      </section>

      {/* 
      <section>
        <div className="home-banner" style={imageStyle}>
          <div className="container">
            <div className="row py-2 py-md-3 py-lg-5 ">
              <div className="col  border-0 py-2 py-md-3 py-lg-5  ">
                <p className="h2  ">Your Health</p>
                <p className="h1 ">Is Our Priority</p>
                <div className=" py-3 py-md-5">
                  <button
                    type="button"
                    className="btn btn-outline-info px-5 rounded-pill"
                  >
                    Get Start{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* ========== service  ============= */}
      <section id="service">
        <div className="container py-3 py-md-5">
          <div className="row d-flex justify-content-center">
            <div className=" py-3 py-md-5">
              <h1 className="text-center" id="service">
                Service{" "}
              </h1>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-md-6 col-lg-4 py-1 py-md-3">
              <div className="card">
                <div className="card-body">
                  <div className="py-3">
                    <img src={medBox} className="w-100" height={50} alt="" />
                  </div>
                  <h5 className="card-title text-center">
                    Advanced Technology
                  </h5>

                  <p className="card-text text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam quis placerat urna. Nulla nulla diam, adipiscing non
                    ornare non, commodo..
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 py-1 py-md-3">
              <div className="card">
                <div className="card-body">
                  <div className="py-3">
                    <img src={doc} className="w-100" height={50} alt="" />
                  </div>
                  <h5 className="card-title text-center">
                    Healthcare Solutions
                  </h5>

                  <p className="card-text text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam quis placerat urna. Nulla nulla diam, adipiscing non
                    ornare non, commodo..
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4 py-1 py-md-3">
              <div className="card">
                <div className="card-body">
                  <div className="py-3">
                    <img src={calls} className="w-100" height={50} alt="" />
                  </div>
                  <h5 className="card-title text-center">24/7 Availability</h5>

                  <p className="card-text text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam quis placerat urna. Nulla nulla diam, adipiscing non
                    ornare non, commodo..
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ========== our doctor  ============= */}
      <section>
        <div
          className=" mt-5 p-0 pt-lg-5"
          style={{ backgroundColor: "#F8F8F8" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-8 mt-3">
                <h5 className="my-2">Dr. Stephanie Wosniack</h5>
                <hr
                  color="#0fa3b1"
                  style={{ color: "#0fa3b1", width: "180px", height: "3px" }}
                  className="w-10"
                />
                <p className="h1">
                  {" "}
                  OUR{" "}
                  <span className="" style={{ color: "#0fa3b1" }}>
                    TEAM
                  </span>
                </p>

                <p className="fs-5 mt-3" style={{ lineHeight: "40px" }}>
                  Dr. Stephanie Wosniack is is dedicated to providing her
                  patients with the best possible care. We at MediCare are
                  focused on helping you. After receiving successful care for
                  various aches and pains over the years, Dr. Woshiack found her
                  calling to help others get well. Dr. Stephanie Wosniack is is
                  dedicated to providing her patients with the best possible
                  care. We at MediCare are focused on helping you. Dr. Woshiack
                  found her calling to help others get well.
                </p>
              </div>
              <div className="col-sm-12 col-md-4 mt-3 align-self-end">
                <img
                  src={doctorImg}
                  className="img-fluid"
                  style={{
                    width: "auto !important",
                    height: "auto !important",
                    maxWidth: "100%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ========== testimonials  ============= */}
      <section id="service1">
        <div className="">
          <div className="container py-3 py-md-5">
            <div className=" py-3 py-md-5">
              <h1 className="text-center primary-color">
                What Our Patients Say About Our Medical Treatments{" "}
              </h1>
            </div>
            <div className="row justify-content-center">
              <div className="col-12 col-md-6 col-lg-4 mt-5 pt-5">
                <div className="card text-center" style={card}>
                  <img
                    className="card-img-top"
                    style={cardImgTop}
                    src="https://images.unsplash.com/photo-1572561300743-2dd367ed0c9a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=50&w=300"
                    alt=""
                  />
                  <div className="card-body py-5">
                    <h5>
                      <span> Project Manager </span>
                    </h5>
                    <p className="card-text">
                      “ Nam libero tempore, cum soluta nobis est eligendi optio
                      cumque nihil impedit quo minus id quod maxime placeat ”{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4 mt-5 pt-5">
                <div className="card text-center" style={card}>
                  <img
                    className="card-img-top"
                    style={cardImgTop}
                    src="https://images.unsplash.com/photo-1572561300743-2dd367ed0c9a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=50&w=300"
                    alt=""
                  />
                  <div className="card-body py-5">
                    <h5>
                      <span> Project Manager </span>
                    </h5>
                    <p className="card-text">
                      “ Nam libero tempore, cum soluta nobis est eligendi optio
                      cumque nihil impedit quo minus id quod maxime placeat ”{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4 mt-5 pt-5">
                <div className="card text-center" style={card}>
                  <img
                    className="card-img-top"
                    style={cardImgTop}
                    src="https://images.unsplash.com/photo-1572561300743-2dd367ed0c9a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=50&w=300"
                    alt=""
                  />
                  <div className="card-body py-5">
                    <h5>
                      <span> Project Manager </span>
                    </h5>
                    <p className="card-text">
                      “ Nam libero tempore, cum soluta nobis est eligendi optio
                      cumque nihil impedit quo minus id quod maxime placeat ”{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ========== footer  ============= */}
      <footer style={{ backgroundColor: "#0FA3B1", color: "white" }}>
        <div className="container py-3 py-md-5">
          <div className="row">
            <div className="col-12 col-md-4 py-2">
              <p className="h3 ">About Us</p>
              <hr
                color="white "
                style={{ width: "100px", height: "3px", opacity: "100" }}
              />
              <div className="py-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                fuga sint unde, harum iusto nobis pariatur non nulla modi
                maxime.
              </div>
              <div className="d-flex justify-content-around py-2 py-md-5 ">
                <Whatsapp size={40} />
                <Facebook size={40} />
                <Instagram size={40} />
                <TwitterX size={40} />
              </div>
            </div>
            <div className="col-12 col-md-4">
              <p className="h3">Quick Links</p>
              <hr
                color="white"
                style={{ width: "100px", height: "3px", opacity: "100" }}
              />
              <div className="py-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </div>
              <div className="px-5 ">
                <ul className="">
                  <li className="mt-2 ">Home</li>
                  <li className="mt-2 ">About Us</li>
                  <li className="mt-2 ">Contact</li>
                  <li className="mt-2 ">Service</li>
                  <li className="mt-2 ">Register</li>
                  <li className="mt-2 ">Login</li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <p className="h3">Open Hours</p>
              <hr
                color="white"
                style={{ width: "100px", height: "3px", opacity: "100" }}
              />
              <div className="py-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque
                deserunt cum rerum blanditiis optio. Expedita exercitationem
                dolore quibusdam porro doloribus commodi laboriosam facere
                delectus tempore excepturi! Architecto, soluta! Ducimus,
                debitis.
              </div>
              <div className=" p-1 pt-0">
                <ul className="px-3">
                  <li className="mt-2">Monday - Friday: 8:00am - 7:00pm </li>
                  <li className="mt-2">Saturday: 8:00am - 3:00pm </li>
                  <li className="mt-2">Sunday: Leave</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

// CSS for smooth scrolling
document.documentElement.style.scrollBehavior = "smooth";
export default Home;
