import React, { useEffect, useState } from 'react'
import { getQueryParam } from '../../../helpers/getQueryParams';
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePatientRecord } from '../../../redux/actions/patientAction';
import DataTable from 'react-data-table-component';
import { getViewPatientTreatmentDrugDetailsRecords } from '../../../redux/actions/treatmentPageAction/viewPatientDrugDetails';
import { Link, useNavigate } from 'react-router-dom';
import getEnvironmentUrl from '../../../helpers/envHelper';




const ViewDrugsDetailsFrom = () => {
    const BASE_URL = getEnvironmentUrl();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { patient } = useSelector((state) => state.patientInfo);
    const { patientTreatmentDrugDetails } = useSelector((state) => state.getPatientTreatmentRecordDrugDetails);

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
        dispatch(getViewPatientTreatmentDrugDetailsRecords(patient_id, cycleTestName, date));
    }, [dispatch, patient_id]);


    const { generalInfo, premedicationItems, chemotherapyItems, takeHomeItems } = patientTreatmentDrugDetails;

    console.log("patientTreatmentDrugDetails:", patientTreatmentDrugDetails);


    const [generalInfoDetails, setGeneralInfoDetails] = useState({})
    const [preDrugDateils, setPreDrugDetails] = useState([]);
    const [chemoDrugDetails, setChemoDrugDetails] = useState([])
    const [takeHomeDrugDetails, setTakeHomeDrugDetails] = useState([])

    console.log("generalInfoDetails:", generalInfo);
    console.log("preDrugDateils:", premedicationItems);
    console.log("chemoDrugDetails:", chemotherapyItems);
    console.log("takeHomeDrugDetails:", takeHomeItems);


    useEffect(() => {
        setGeneralInfoDetails(generalInfo);
        setPreDrugDetails(premedicationItems);
        setChemoDrugDetails(chemotherapyItems);
        setTakeHomeDrugDetails(takeHomeItems);
    }, [patientTreatmentDrugDetails])


    // pre table header
    const PremedicationTableColumns = [
        {
            name: "Drug Type",
            flex: 1,
            selector: (row) => `${row.drugType}. ${row.drugName}`,
            sortable: true,
            grow: 1.8,
        },
        {
            name: "Brand",
            selector: (row) => row.brandName,
            sortable: true,
            flex: 1,
        },
        {
            name: "Dose / Unit ",
            selector: (row) => `${row.doseValue} / ${row.unit}`,
        },
        {
            name: "Duration (days)",
            selector: (row) =>
                `${row.duration} ${row.duration === 0 || (1 && "day")}`,
        },
        {
            name: "Frequency",
            selector: (row) => `${row.frequency[0]} - ${row.frequency[1]} - ${row.frequency[2]}`,
        },
        {
            name: "Administraion Details",
            selector: (row) => row.details,
            grow: 1.5,
        },
        {
            name: "Start Time",
            selector: (row) => row.startTime,
        },
        {
            name: "End Time",
            selector: (row) => row.endTime,
        },
    ];

    const ChemotherapyTableColumns = [
        {
            name: "Drug Name",
            selector: (row) => `${row.drugType} ${row.drugName}`,
            grow: 1.5,
        },
        {
            name: "Brand Name",
            selector: (row) => `${row.brandName}`,
        },
        {
            name: "Dose|unit",
            selector: (row) => `${row.dose} ${row.doseUnit}`,
        },
        {
            name: "Duration",
            selector: (row) => `${row.duration} hrs`,
        },
        {
            name: "Dilution Volume (ml)",
            selector: (row) => `${row.dilution} ml`,
        },
        {
            name: "Administraion Details",
            selector: (row) => row.details,
            grow: 1.5,
        },
        {
            name: "Expired Date",
            selector: (row) => row.expiredDate,
        },
        {
            name: "Start Time",
            selector: (row) => row.startTime,
        },
        {
            name: "End Time",
            selector: (row) => row.endTime,
        },
    ];

    const TakeHomeTableColumns = [
        {
            name: "Drug Type",
            flex: 1,
            selector: (row) => `${row.drugType}. ${row.drugName}`,
            sortable: true,
            grow: 1.8,
        },
        {
            name: "Brand",
            selector: (row) => row.brandName,
            sortable: true,
            flex: 1,
        },
        {
            name: "Dose / Unit ",
            selector: (row) => `${row.doseValue} / ${row.unit}`,
        },
        {
            name: "Duration (days)",
            selector: (row) =>
                `${row.duration} ${row.duration === 0 || (1 && "day")}`,
        },
        {
            name: "Frequency",
            selector: (row) => `${row.frequency[0]} - ${row.frequency[1]} - ${row.frequency[2]}`,
        },
        {
            name: "Administraion Details",
            selector: (row) => row.details,
            grow: 1.5,
        },
        {
            name: "Dispensed",
            selector: (row) => row.dispensed,
        },
    ];

    const file = generalInfo?.uploadBloodReport || 'Null';

    const showPDF = (pdf) => {
        window.open(`${BASE_URL}/${pdf}`, '_blank', 'noreferrer')
    }

    // table style 
    const customTableStyle = {
        rows: {
            style: {
                fontSize: "15px",
            },
        },
        headCells: {
            style: {
                backgroundColor: "#c1e6e9",
                fontSize: "15px",
            },
        },
    };


    return (
        <>

            <div
                className="container-fluid my-lg-5"
                style={{ overflow: "auto", maxHeight: "calc(100vh - 56pxpx)" }}
            >
                {/* onSubmit={treatmentFormHandleSubmit} */}
                <form >
                    <div>
                        <div className="text-center text-info">
                            <h1 className="font-weight-bold"> {cycleTestName} ~ Day - {day} </h1>
                        </div>

                        {/* ******************  General Information form *************  */}
                        <div className="container-fluid">
                            <div className="my-4 border rounded-top">
                                <div className="bg-info px-3 py-2 rounded-top">
                                    <div className="row d-flex  ">
                                        <div className="col-12">
                                            <div className=" d-flex align-items-center">
                                                <h3 className="m-0 text-white">General Information</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ========== Form field here ========== */}
                                <div className="row mx-1 my-2">
                                    <div className="col-12">
                                        <div className="form-row">
                                            <div className="form-group col-sm-12 col-md-6 col-lg-3">
                                                <fieldset disabled>
                                                    <label>Cancer Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={generalInfoDetails?.cancerType}
                                                        readOnly
                                                    />
                                                </fieldset>
                                            </div>

                                            <div className="form-group col-sm-12 col-md-6 col-lg-3">
                                                <fieldset disabled>
                                                    <label>Regimen Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={generalInfoDetails?.regimenType}
                                                        readOnly
                                                    />
                                                </fieldset>
                                            </div>

                                            <div className="form-group col-sm-12 col-md-6 col-lg-3">
                                                <fieldset disabled>
                                                    <label>Day of Cycle Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={generalInfoDetails?.dayOfCycle}
                                                        readOnly
                                                    />
                                                </fieldset>
                                            </div>
                                            <div className="form-group col-sm-12 col-md-6 col-lg-3">
                                                <label>Date</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={generalInfoDetails?.currentDate}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-sm-12 col-md-6 col-lg-3">
                                                <label>Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={generalInfoDetails?.patientName}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="form-group col-sm-12 col-md-6 col-lg-3">
                                                <label>Age</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={generalInfoDetails?.patientAge}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="form-group col-sm-12 col-md-6 col-lg-3">
                                                <label>Gender</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    readOnly
                                                    value={generalInfoDetails?.patientGender}
                                                />
                                            </div>
                                            <div className="form-group col-sm-12 col-md-6 col-lg-3">
                                                <label>UHID No.</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    readOnly
                                                    value={generalInfoDetails?.patientUhid}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-sm-12 col-md-6 col-lg-3">
                                                <label>IP No.</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={generalInfoDetails?.patientIp}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="form-group col-sm-12 col-md-6 col-lg-3">
                                                <label>Height (cm)</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={generalInfoDetails?.patientHeight}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="form-group col-sm-12 col-md-6 col-lg-3">
                                                <label>Weight (kg)</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={generalInfoDetails?.patientWeight}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="form-group col-sm-12 col-md-6 col-lg-3">
                                                <label>BSA</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={generalInfoDetails?.patientBSA}
                                                    readOnly
                                                />
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group col-sm-12 col-md-6 col-lg-3">
                                                <label>Comments</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={generalInfoDetails?.patientComments}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="form-group col-sm-12 col-md-6 col-lg-3">
                                                <label>Consultant</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={generalInfoDetails?.patientConsultant}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="form-group col-sm-12 col-md-6 col-lg-6">
                                                <label>Blood Report Comments</label>

                                                <textarea name="" id="" rows={1} readOnly className="form-control" type="text" value={generalInfoDetails?.patientBloodReportComment} ></textarea>
                                                {/* <input
                                                    type="text"
                                                    className="form-control"
                                                    value={generalInfoDetails?.patientBloodReportComment}
                                                    readOnly
                                                /> */}
                                            </div>

                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-sm-12 col-md-3 col-lg-3">
                                                <label>Upload Blood Report</label>
                                                <br />
                                                <button type="button" disabled={file == 'Null' || file == '' ? true : false}
                                                    className="btn btn-info btn-sm px-2"
                                                    onClick={(e) => {
                                                        e.preventDefault(); // Prevent default behavior
                                                        showPDF(file)
                                                    }}
                                                >
                                                    View & Download{" "}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* *******************  premedication table   *********************** */}

                        <div className=" container-fluid my-3 p-0 ">
                            <div className=" my-2">
                                <div className="  bg-info px-3 py-2 rounded-top">
                                    <div className="row d-flex  ">
                                        <div className="col-md-6">
                                            <div className=" d-flex align-items-center">
                                                <h3 className="m-0 text-white">Premedication Items</h3>
                                            </div>
                                        </div>
                                        <div className="col-md-6 ">
                                            {/* <div className="d-flex align-items-center justify-content-end">
                                                <button
                                                    data-toggle="modal"
                                                    className="btn btn-light py-2"
                                                    type="button"
                                                    data-target="#PremedicationLibFormData"
                                                    // disabled={checkPreTreatmentData}
                                                >
                                                    <PlusSquareFill className="d-flex align-items-center bg-primary-text " />
                                                </button>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>

                                <DataTable
                                    showGridlines
                                    className="border"
                                    columns={PremedicationTableColumns}
                                    data={preDrugDateils}
                                    striped={true}
                                    pagination
                                    customStyles={customTableStyle}
                                    selectableRowsHighlight
                                    highlightOnHover
                                />
                            </div>
                        </div>

                        {/* *******************  Chemotherapy table   *********************** */}
                        <div className=" container-fluid my-3 p-0 ">
                            <div className=" my-2">
                                <div className="  bg-info px-3 py-2 rounded-top">
                                    <div className="row d-flex  ">
                                        <div className="col-md-6">
                                            <div className=" d-flex align-items-center">
                                                <h3 className="m-0 text-white">
                                                    Chemotherapy Administration
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="col-md-6 ">
                                            {/* <div className="d-flex align-items-center justify-content-end">
                                                <button
                                                    className="btn btn-light py-2"
                                                    data-toggle="modal"
                                                    type="button"
                                                    data-target="#ChemotherapyForm"
                                                    disabled={checkChemoTreatmentData}
                                                >
                                                    <PlusSquareFill className="d-flex align-items-center bg-primary-text " />
                                                </button>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <DataTable
                                    showGridlines
                                    className="border"
                                    columns={ChemotherapyTableColumns}
                                    data={chemoDrugDetails}
                                    striped={true}
                                    pagination
                                    customStyles={customTableStyle}
                                    selectableRowsHighlight
                                    highlightOnHover
                                />
                            </div>
                        </div>

                        {/* *******************  take home table   *********************** */}

                        <div className=" container-fluid my-3 p-0 ">
                            <div className=" my-2">
                                <div className="  bg-info px-3 py-2 rounded-top">
                                    <div className="row d-flex  ">
                                        <div className="col-md-6">
                                            <div className=" d-flex align-items-center">
                                                <h3 className="m-0 text-white">Take Home Medication</h3>
                                            </div>
                                        </div>
                                        <div className="col-md-6 ">

                                        </div>
                                    </div>
                                </div>
                                <DataTable
                                    showGridlines
                                    className="border"
                                    columns={TakeHomeTableColumns}
                                    data={takeHomeDrugDetails}
                                    striped={true}
                                    pagination
                                    customStyles={customTableStyle}
                                    selectableRowsHighlight
                                    highlightOnHover
                                />
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
                        <Link
                            to={`/dashboard/view/pdf?patient_id=${patient_id}&cycleTestName=${cycleTestName}&date=${date}&day=${day}`}
                            disabled
                            className="btn btn-info px-md-5"
                        >
                            Print
                        </Link>
                    </div>
                </form>
            </div>


        </>
    )
}

export default ViewDrugsDetailsFrom