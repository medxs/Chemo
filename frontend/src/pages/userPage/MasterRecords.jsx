import React, { useEffect } from 'react'
import { Capsule, HospitalFill, Prescription2 } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getCancerList } from '../../redux/actions/masterRecordAction';

const MasterRecords = () => {

  const { cancerList } = useSelector((state) => state.cancerDataState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCancerList());
  }, [dispatch]);

  console.log("cancerList:", cancerList);


  return (
    <>
      <div className="container-fluid">
        <div className="mx-3 my-3">
          <div
            className="row py-md-1 align-items-center "
            style={{ backgroundColor: "#8ddee5", borderRadius: "5px" }}
          >
            <div className="col text-center py-3">
              <p className="h4 m-0">Master Records </p>
            </div>
          </div>
        </div>

        {/* =============== 3 main container ================= */}
        <div className="container">
          <div className="row justify-content-md-center ">
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
                    <Capsule
                      color="white"
                      style={{
                        backgroundColor: "#0fa3b1",
                        width: "40px",
                        height: "40px",
                        padding: "5px",
                        borderRadius: "15px",
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                      }}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title bg-primary-text font-weight-bold h4">
                      Create Master <br /> Records
                    </h5>
                    <h5 className="card-title font-weight-bold h3">
                      {cancerList?.length}
                    </h5>
                    <p className="card-text">Records</p>
                  </div>
                  <div className="card-footer">
                    <Link
                      type="button"
                      className="btn btn-info btn-block"
                      to={'/masterRecords/create'}
                    >
                      Add Items
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
                    <HospitalFill
                      color="white"
                      style={{
                        backgroundColor: "#0fa3b1",
                        width: "40px",
                        height: "40px",
                        padding: "5px",
                        borderRadius: "15px",
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                      }}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title bg-primary-text font-weight-bold h4">
                      View Master <br /> Records
                    </h5>
                    <h5 className="card-title font-weight-bold h3">{cancerList?.length}</h5>
                    <p className="card-text">Records</p>
                  </div>
                  <div className="card-footer">
                    <Link
                      type="button"
                      className="btn btn-info btn-block"
                      to={'/masterRecords/view'}
                    >
                      Add Items
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MasterRecords