import React, { useEffect, useRef, useState } from "react";
import { getQueryParam } from "../../../helpers/getQueryParams";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePatientRecord } from "../../../redux/actions/patientAction";
import { getViewPatientTreatmentDrugDetailsRecords } from "../../../redux/actions/treatmentPageAction/viewPatientDrugDetails";
import { Link, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const PdfForm = () => {
  const componentRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { patient } = useSelector((state) => state.patientInfo);
  const { patientTreatmentDrugDetails } = useSelector(
    (state) => state.getPatientTreatmentRecordDrugDetails
  );

  // get param from url
  const patient_id = getQueryParam("patient_id");
  const cycleTestName = getQueryParam("cycleTestName");
  const date = getQueryParam("date");
  const day = getQueryParam("day");

  console.log("patient_id:", patient_id);
  console.log("cycleTestName:", cycleTestName);
  console.log("date:", date);

  useEffect(() => {
    dispatch(getSinglePatientRecord(patient_id));
    dispatch(
      getViewPatientTreatmentDrugDetailsRecords(patient_id, cycleTestName, date)
    );
  }, [dispatch, patient_id]);

  const { generalInfo, premedicationItems, chemotherapyItems, takeHomeItems } =
    patientTreatmentDrugDetails;

  console.log("patientTreatmentDrugDetails:", patientTreatmentDrugDetails);

  const [generalInfoDetails, setGeneralInfoDetails] = useState({});
  const [preDrugDateils, setPreDrugDetails] = useState([]);
  const [chemoDrugDetails, setChemoDrugDetails] = useState([]);
  const [takeHomeDrugDetails, setTakeHomeDrugDetails] = useState([]);

  console.log("generalInfoDetails:", generalInfo);
  console.log("preDrugDateils:", premedicationItems);
  console.log("chemoDrugDetails:", chemotherapyItems);
  console.log("takeHomeDrugDetails:", takeHomeItems);

  useEffect(() => {
    setGeneralInfoDetails(generalInfo);
    setPreDrugDetails(premedicationItems);
    setChemoDrugDetails(chemotherapyItems);
    setTakeHomeDrugDetails(takeHomeItems);
  }, [
    patientTreatmentDrugDetails,
    generalInfo,
    premedicationItems,
    chemotherapyItems,
    takeHomeItems,
  ]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <style>
        {`@media print {
                @page {
                    size: A4 landscape;
                    margin: 7mm;
                    }
                }
                
            .genTable .table thead th{
                vertical-align: unset;
             }
                
            `}
      </style>
      <div
        className="container-fluid my-lg-5"
        style={{ overflow: "auto", maxHeight: "calc(100vh - 56pxpx)" }}
      >
        {/* onSubmit={treatmentFormHandleSubmit} */}

        <div ref={componentRef} style={{ width: "100%" }}>
          <div className="text-center text-info">
            <h1 className="font-weight-bold">Hospital Name</h1>
          </div>

          {/* ******************  General Information form *************  */}
          <div className="container-fluid">
            <div className="my-4  rounded-top">
              <div className="bg-info px-3 py-2 rounded-top">
                <div className="row d-flex  ">
                  <div className="col-12">
                    <div className=" d-flex align-items-center">
                      <h3 className="m-0 text-white text-capitalize">
                        General Information
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              {/* ========== Form details here ========== */}
              <div className="table-responsive genTable">
                <table className="table table-striped table-bordered m-0">
                  <thead>
                    <tr>
                      <th scope="col">
                        Cancer Name:{" "}
                        <p className="m-0 font-weight-normal">
                          {generalInfoDetails?.cancerType}
                        </p>{" "}
                      </th>
                      <th scope="col">
                        Regimen Name:{" "}
                        <p className="m-0 font-weight-normal">
                          {generalInfoDetails?.regimenType}
                        </p>{" "}
                      </th>
                      <th scope="col">
                        Day of Cycle Name:{" "}
                        <p className="m-0 font-weight-normal">
                          {generalInfoDetails?.dayOfCycle}
                        </p>{" "}
                      </th>
                      <th scope="col">
                        Date:{" "}
                        <p className="m-0 font-weight-normal">
                          {generalInfoDetails?.currentDate}
                        </p>{" "}
                      </th>
                    </tr>
                    <tr>
                      <th scope="col">
                        Patient Name:
                        <p className="m-0 font-weight-normal">
                          {generalInfoDetails?.patientName}
                        </p>{" "}
                      </th>
                      <th scope="col">
                        Patient Age:
                        <p className="m-0 font-weight-normal">
                          {generalInfoDetails?.patientAge}
                        </p>
                      </th>
                      <th scope="col">
                        Patient Gender :
                        <p className="m-0 font-weight-normal">
                          {generalInfoDetails?.patientGender}
                        </p>
                      </th>
                      <th scope="col">
                        Patient UHID No.:
                        <p className="m-0 font-weight-normal">
                          {generalInfoDetails?.patientUhid}
                        </p>
                      </th>
                    </tr>
                    <tr>
                      <th scope="col">
                        Patient IP No.:
                        <p className="m-0 font-weight-normal">
                          {generalInfoDetails?.patientIp}
                        </p>
                      </th>
                      <th scope="col">
                        Patient Height:
                        <p className="m-0 font-weight-normal">
                          {generalInfoDetails?.patientHeight}
                        </p>
                      </th>
                      <th scope="col">
                        Patient Weight:
                        <p className="m-0 font-weight-normal">
                          {generalInfoDetails?.patientWeight}
                        </p>
                      </th>
                      <th scope="col">
                        Patient BSA:
                        <p className="m-0 font-weight-normal">
                          {generalInfoDetails?.patientBSA}
                        </p>
                      </th>
                    </tr>
                    <tr>
                      <th scope="col">
                        Comments:
                        <p className="m-0 font-weight-normal">
                          {generalInfoDetails?.patientComments}
                        </p>
                      </th>
                      <th scope="col">
                        Consultant:
                        <p className="m-0 font-weight-normal">
                          {generalInfoDetails?.patientConsultant}
                        </p>
                      </th>
                      <th scope="col">
                        Blood Report Comments:
                        <p className="m-0 font-weight-normal">
                          {generalInfoDetails?.patientBloodReportComment}
                        </p>
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>

          {/* *******************  premedication table   *********************** */}

          <div className="container-fluid my-3 p-0">
            <div className="bg-info px-3 py-2 rounded-top">
              <div className="row d-flex  ">
                <div className="col-12">
                  <div className=" d-flex align-items-center">
                    <h3 className="m-0 text-white"> Premedication</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Drug Type | Name</th>
                    <th scope="col">Brand Name</th>
                    <th scope="col">Dose | Unit</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Frequency</th>
                    <th scope="col">Start Time</th>
                    <th scope="col">End Time</th>
                  </tr>
                </thead>
                <tbody>
                  {preDrugDateils &&
                    preDrugDateils.map((item) => (
                      <tr key={item._id}>
                        <td>
                          {item.drugType}.{item.drugName}
                        </td>
                        <td>{item.brandName}</td>
                        <td>
                          {item.doseValue} {item.unit}
                        </td>
                        <td>
                          {item.duration} {item.duration === 1 ? "day" : "days"}
                        </td>
                        <td>
                          {item.frequency[0]} - {item.frequency[1]} -{" "}
                          {item.frequency[2]}
                        </td>
                        <td>{item.startTime}</td>
                        <td>{item.endTime}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* *******************  Chemotherapy table   *********************** */}
          <div className="container-fluid my-3 p-0">
            <div className="bg-info px-3 py-2 rounded-top">
              <div className="row d-flex  ">
                <div className="col-12">
                  <div className=" d-flex align-items-center">
                    <h3 className="m-0 text-white">
                      Chenotherapy Administration
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Drug Type | Name</th>
                    <th scope="col">Brand Name</th>
                    <th scope="col">Dose | Unit</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Dilution Volume</th>
                    <th scope="col">Administraion Details</th>
                    <th scope="col">Expired Date</th>
                    <th scope="col">Start Time</th>
                    <th scope="col">End Time</th>
                  </tr>
                </thead>
                <tbody>
                  {chemoDrugDetails &&
                    chemoDrugDetails.map((item) => (
                      <tr key={item._id}>
                        <td>
                          {item.drugType}.{item.drugName}
                        </td>
                        <td>{item.brandName}</td>
                        <td>
                          {item.dose} {item.doseUnit}
                        </td>
                        <td>{item.duration} hrs</td>
                        <td>{item.dilution} ml</td>
                        <td>{item.details}</td>
                        <td>{item.expiredDate}</td>
                        <td>{item.startTime}</td>
                        <td>{item.endTime}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* *******************  take home table   *********************** */}

          <div className="container-fluid my-3 p-0">
            <div className="bg-info px-3 py-2 rounded-top">
              <div className="row d-flex">
                <div className="col-12">
                  <div className=" d-flex align-items-center">
                    <h3 className="m-0 text-white">Take Home Medications</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Drug Type | Name</th>
                    <th scope="col">Brand Name</th>
                    <th scope="col">Dose | Unit</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Frequency</th>
                    <th scope="col">Administraion Details</th>
                    <th scope="col">Dispensed</th>
                  </tr>
                </thead>
                <tbody>
                  {takeHomeDrugDetails &&
                    takeHomeDrugDetails.map((item) => (
                      <tr key={item._id}>
                        <td>
                          {item.drugType}.{item.drugName}
                        </td>
                        <td>{item.brandName}</td>
                        <td>
                          {item.doseValue} {item.unit}
                        </td>
                        <td>
                          {item.duration} {item.duration === 1 ? "day" : "days"}
                        </td>
                        <td>
                          {item.frequency[0]} - {item.frequency[1]} -{" "}
                          {item.frequency[2]}
                        </td>
                        <td>{item.details}</td>
                        <td>{item.dispensed}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between py-2">
          <button
            type="button"
            className="btn btn-info px-md-5"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="btn btn-info px-md-5"
          >
            Download
          </button>
        </div>
      </div>
    </>
  );
};

export default PdfForm;
