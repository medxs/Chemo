import React, { useEffect, useState } from "react";
import { PeopleFill, PersonCheck, PersonCircle } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import { getCreatedProfilePatientsList, getPatients, getTodayCasesPatientRecordsList } from "../../redux/actions/patientsAction";

const Dashboard = () => {

  const currentPage = 1, perPage = 10, search = "";

  const dispatch = useDispatch([]);
  const { patientsCount, loading, } = useSelector(
    (state) => state.patientsState
  );
  const { createdProfilePatitentsCount, isLoading: startTreatmentLoading } = useSelector((state) => state.startTreatmentProfiles);

  const { todayCasesPatitentsCount, isLoading: todayTreatmentLoading } = useSelector((state) => state.todayCasesTreatmentProfiles);


  useEffect(() => {
    dispatch(getPatients(currentPage, perPage, search));
    dispatch(getCreatedProfilePatientsList(currentPage, perPage, search));
    dispatch(getTodayCasesPatientRecordsList(currentPage, perPage, search));
  }, [dispatch]);



  //  ******************  button disable function ***********
  const isFirstBtnDisabled = patientsCount >= 1 ? false : true; // Change this based on your condition
  const isSecondBtnDisabled = createdProfilePatitentsCount >= 1 ? false : true; // Change this based on your condition
  const isThirdBtnDisabled = todayCasesPatitentsCount >= 1 ? false : true; // Change this based on your condition


  return (
    <>
      <div className="container-fluid">
        <div className="mx-3 my-3">
          <div
            className="row py-md-1 align-items-center "
            style={{ backgroundColor: "#8ddee5", borderRadius: "5px" }}
          >
            <div className="col">
              <p className="h4 m-0">Add Patient </p>
            </div>
            <div className="col d-flex justify-content-end">
              <Link
                type="button"
                className="btn btn-info"
                to={"/dashboard/CreatePatientsProfile"}
              >
                {" "}
                Add Patient{" "}
              </Link>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-md-center ">

            <div className="col-12 col-md-6 col-lg-4">
              <div className="col mb-4">
                <div className="card text-center shadow bg-white rounded">
                  <div
                    className="mx-auto my-3"
                    style={{
                      backgroundColor: "#9EE3E7",
                      width: 60,
                      height: 60,
                      padding: 30,
                      borderRadius: "30px",
                      position: "relative",
                    }}
                  >
                    <PersonCircle
                      color="white"
                      style={{
                        backgroundColor: "#0fa3b1",
                        width: "40px",
                        height: "40px",
                        padding: "5px",
                        borderRadius: "30px",
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                      }}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title bg-primary-text font-weight-bold h4">
                      New <br /> Patients
                    </h5>
                    {startTreatmentLoading ? (
                      <p className="card-title font-weight-bold h3">
                        Loading...
                      </p>
                    ) : (
                      <p className="card-title font-weight-bold h3">
                        {createdProfilePatitentsCount || 0}
                      </p>
                    )}
                    <p className="card-text">Records</p>
                  </div>
                  <div className="card-footer">
                    <Link
                      to="/dashboard/startTreatment"
                      className={`btn btn-info btn-block`}
                      style={{
                        pointerEvents: isSecondBtnDisabled ? 'none' : 'auto',
                        cursor: isSecondBtnDisabled ? 'not-allowed' : 'pointer',
                        opacity: isSecondBtnDisabled ? 0.5 : 1
                      }}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="col mb-4">
                <div className="card text-center shadow bg-white rounded">
                  <div
                    className="mx-auto my-3"
                    style={{
                      backgroundColor: "#9EE3E7",
                      width: 60,
                      height: 60,
                      padding: 30,
                      borderRadius: "30px",
                      position: "relative",
                    }}
                  >
                    <PersonCheck
                      color="white"
                      style={{
                        backgroundColor: "#0fa3b1",
                        width: "40px",
                        height: "40px",
                        padding: "5px",
                        borderRadius: "30px",
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                      }}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title bg-primary-text font-weight-bold h4">
                      Today <br /> Cases{" "}
                    </h5>
                    {todayTreatmentLoading ? (
                      <p className="card-title font-weight-bold h3">
                        Loading...
                      </p>
                    ) : (
                      <p className="card-title font-weight-bold h3">
                        {todayCasesPatitentsCount || 0}
                      </p>
                    )}
                    <p className="card-text">Records</p>
                  </div>
                  <div className="card-footer">
                    <Link
                      to="/dashboard/todayTreatment"
                      className={`btn btn-info btn-block`}
                      style={{
                        pointerEvents: isThirdBtnDisabled ? 'none' : 'auto',
                        cursor: isThirdBtnDisabled ? 'not-allowed' : 'pointer',
                        opacity: isThirdBtnDisabled ? 0.5 : 1
                      }}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 ">
              <div className="col mb-4">
                <div className="card text-center shadow bg-white rounded">
                  <div
                    className="mx-auto my-3"
                    style={{
                      backgroundColor: "#9EE3E7",
                      width: 60,
                      height: 60,
                      padding: 30,
                      borderRadius: "30px",
                      position: "relative",
                    }}
                  >
                    <PeopleFill
                      color="white"
                      style={{
                        backgroundColor: "#0fa3b1",
                        width: "40px",
                        height: "40px",
                        padding: "5px",
                        borderRadius: "30px",
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                      }}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title bg-primary-text font-weight-bold h4">
                      All patients in Treatment
                    </h5>

                    {loading ? (
                      <p className="card-title font-weight-bold h3">
                        Loading...
                      </p>
                    ) : (
                      <p className="card-title font-weight-bold h3">
                        {patientsCount || 0}
                      </p>
                    )}
                    <p className="card-text">Records</p>
                  </div>
                  <div className="card-footer">
                    {/* <Link className="btn btn-info btn-block" to={'/dashboard/table'}>View Details</Link> */}
                    <Link
                      to="/dashboard/allPatients"
                      className={`btn btn-info btn-block`}
                      style={{
                        pointerEvents: isFirstBtnDisabled ? 'none' : 'auto',
                        cursor: isFirstBtnDisabled ? 'not-allowed' : 'pointer',
                        opacity: isFirstBtnDisabled ? 0.5 : 1
                      }}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
