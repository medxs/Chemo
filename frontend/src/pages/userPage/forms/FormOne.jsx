import React, { useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import "react-multi-date-picker/styles/colors/teal.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePatientRecord } from "../../../redux/actions/patientAction";
import moment from "moment";
import { getQueryParam } from "../../../helpers/getQueryParams";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  appointmentDataDeleteInTreatmentRecord,
  createPatientCycleTestRecord,
  getPatientCycleTestListSingleRecord,
} from "../../../redux/actions/treatmentPageAction/dateAction";
import { toast } from "react-toastify";
import { dateClearMessage } from "../../../redux/slices/date-Slice/dateSlice";
import $ from "jquery";
import { Trash3Fill } from "react-bootstrap-icons";

const FormOne = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    $(".dropdown-toggle").dropdown();
  }, []);

  const { patient } = useSelector((state) => state.patientInfo);
  const {
    message: dateMsg,
    error: dateErr,
    cycleTestLists,
    getSingleCycleTestList,
  } = useSelector((state) => state.patientCycleTestAndDate);

  console.log("patient patient:", patient);

  const dispatch = useDispatch();
  const product_id = getQueryParam("product_id");
  // console.log("Single Record:", patient);
  console.log("cycleTestLists:", cycleTestLists);
  console.log("get  Single CycleTest:", getSingleCycleTestList);

  // Extracting and formatting all dates
  const allDates =
    cycleTestLists.flatMap((test) =>
      test.appointmentDates.map((appointment) => appointment.date)
    ) || [];

  // const allDates = Array.isArray(cycleTestLists) ? cycleTestLists.flatMap((test) =>
  // test.appointmentDates.map((appointment) => appointment.date)
  // ) : [];

  // console.log("allDates:", allDates);

  useEffect(() => {
    if (product_id) {
      dispatch(getSinglePatientRecord(product_id));
      dispatch(getPatientCycleTestListSingleRecord(product_id));
    }
  }, [dispatch, product_id]);

  // ***********  Date Funtions over here *******************

  // selected dates stored
  const [selectedDates, setSelectedDates] = useState([]);
  const [cycleTestData, setCycleTestData] = useState({});
  const [selectedCycleTestItem, setSelectedCycleTestItem] = useState("");
  const [cycleTest, setNewCycleTest] = useState([]);


  console.log("cycleTestData:", cycleTestData);

  const selectedFirstCycle = cycleTestLists.find(
    (item) => item.cycleTestName === "Cycle Test 1"
  );

  console.log("selectedFirstCycle:", selectedFirstCycle);
  const [dateList, setDateList] = useState({});
  const [selectedCycleTestName, setSelectedCycleTestName] = useState("");
  useEffect(() => {
    if (selectedFirstCycle) {
      setDateList(selectedFirstCycle);
    } else {
      setDateList({});
    }
  }, [selectedFirstCycle]);

  // useEffect(() => {
  //   // Clear the dateList when the route changes
  //   setDateList({});
  // }, [location]);

  console.log("dateList:", dateList);

  const cycleTestName = dateList?.cycleTestName || "";

  // console.log("cycleTestName:", cycleTestName);

  // date functions
  const [dateValue, setDateValue] = useState([]);

  //  -----------  multiple date selector funtions ------------

  const dateFun = (value) => {
    setDateValue({ ...selectedDates });
    const formatedDate = value.map((val, i) => {
      return moment(new Date(val)).format("YYYY/MM/DD");
    });
    const valuesss = { ...formatedDate };

    // console.log("spread opt:", valuesss);

    const data = {
      patientRef_id: patient._id,
      ref: `Cycle Test ${getSingleCycleTestList.length + 1}`,
      dates: formatedDate,
    };
    // console.log("[...cycleTest]:", cycleTest);
    // console.log("[Data]:", data);
    setNewCycleTest([...cycleTest, data]);
    setSelectedDates([]);
    setCycleTestData(data);
    // console.log("fun 1 date:", data);
    dispatch(createPatientCycleTestRecord(data));
  };

  useEffect(() => {
    if (dateMsg) {


      console.log("dateMsg:", dateMsg);
      console.log("dateErr:", dateErr);



      // dispatch(getPatientCycleTestListSingleRecord(product_id));
      if (dateErr) {
        toast.error(dateMsg);
        setTimeout(() => {
          dispatch(dateClearMessage());
          // dispatch(getSinglePatientRecord(product_id));
          // dispatch(getPatientCycleTestListSingleRecord(product_id));
        });
        return;
      }

      toast.success(dateMsg);
      setTimeout(() => {
        dispatch(dateClearMessage());
        dispatch(getSinglePatientRecord(product_id));
        dispatch(getPatientCycleTestListSingleRecord(product_id));
      });
      return;
    }
  }, [dateMsg, dateErr]);
  //  -----------  single date selector funtions ------------

  const dateFun2 = (value) => {
    const formatedDate = moment(new Date(value)).format("YYYY/MM/DD");
    // console.log("value: ", [formatedDate]);
    const payload = [...(cycleTestData?.dates || []), formatedDate];
    // console.log("Playload inside All dates:", payload);
    // console.log("[...cycleTest]:", cycleTest);
    // console.log("[cycleTestData]:", cycleTestData);
    const filteredCycleTests = cycleTest.filter(
      (data) => data.ref !== cycleTestData?.ref
    );
    // console.log("filtered Cycle Testss:", filteredCycleTests);

    const { cycleTestName } = dateList;

    const data = {
      ref: cycleTestName,
      patientRef_id: patient._id,
      dates: [formatedDate],
    };
    setNewCycleTest([
      { ...cycleTestData, dates: payload },
      ...filteredCycleTests,
    ]);
    setCycleTestData({ ...cycleTestData, dates: payload });

    // console.log("Add New dates:", data);
    dispatch(createPatientCycleTestRecord(data));
    dispatch(getPatientCycleTestListSingleRecord());

    const matchedCycleTest = cycleTestLists.find(
      (item) => item.cycleTestName === dateList.cycleTestName
    );
    // console.log("matchedCycleTest:", matchedCycleTest);

    setDateList(matchedCycleTest);
    // console.log("dateList After:", dateList);
  };

  // ---------  its for clear the previous selected value  ----------
  useEffect(() => {
    if (dateValue.length > 0) {
      setSelectedDates([]);
    }
  }, [dateValue]);

  //  ------- disable date functions  start  -----------

  // ********* All cycle test date ***********
  const formattedAllDates = allDates.map((date) =>
    moment(date, "YYYY/MM/DD").format("YYYY-MM-DD")
  );

  // Function to check if a date is disabled
  const isAllDateDisabled = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    return formattedAllDates.includes(formattedDate);
  };

  // ********* single cycle test date ***********

  // Extracting dates from appointmentDates array
  const disabledDates = dateList.appointmentDates
    ? dateList.appointmentDates.map((appointment) =>
      moment(appointment.date, "YYYY/MM/DD").format("YYYY-MM-DD")
    )
    : [];

  // Function to check if a date is disabled
  const isDateDisabledCycleTest = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    return disabledDates.includes(formattedDate);
  };
  //  ------- disable date functions  end  -----------

  // // const disabledDateStrings = cycleTest
  // //   .map((data) => {
  // //     return [...data.dates];
  // //   })
  // //   .flat()
  // //   ?.map((date) => new DateObject(date).format("YYYY-MM-DD"));

  // const isDateDisabled = (date) => {
  //   const formattedDate = date.format("YYYY-MM-DD");
  //   return allDates.includes(formattedDate);
  // };
  //  ------- disable date functions  end  -----------
  //  ------- disable date functions  start  -----------

  // const disabledDateStringsCycleTest = (dateList?.dates || []).map(date =>
  //   moment(new Date(date)).format("YYYY-MM-DD")
  // );

  // const isDateDisabledCycleTest = (date) => {
  //   const formattedDate = date.format("YYYY-MM-DD");
  //   return disabledDateStringsCycleTest.includes(formattedDate);
  // };
  //  ------- disable date functions  start  -----------
  // console.log("TEsts:", value);

  // const sortedAppointments = [...dateList.appointmentDates].sort((a, b) => new Date(a.date) - new Date(b.date)).map((appointment, id) => { return appointment.date })

  // console.log("dats:", sortedAppointments);
  const handleButtonClick = (
    event,
    patientRef_id,
    cycleTestName,
    appointmentDate
  ) => {
    event.stopPropagation();
    event.preventDefault();

    if (
      window.confirm(
        `Are you sure wanna Delete this ${appointmentDate} Record?`
      )
    ) {
      dispatch(
        appointmentDataDeleteInTreatmentRecord(
          patientRef_id,
          cycleTestName,
          appointmentDate
        )
      );
      console.log("Deleted successfully:");
    }

    console.log("deleted Call:", patientRef_id, cycleTestName, appointmentDate);
  };

  const getTodayDate = new Date();

  const year = getTodayDate.getFullYear();
  const month = String(getTodayDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
  const day = String(getTodayDate.getDate()).padStart(2, "0");

  const todayDate = `${year}/${month}/${day}`;

  console.log("todayDate:", todayDate);

  // btn function

  return (
    <>
      <style>
        {`.dateDeleteBtn {
    position: relative;
    top: -10px !important;
    right: -14px !important;
    border-radius: 1px 3px;
    border: none;
}


.dateDeleteBtn:hover {
  background-color: red;
  color: white;
  box-shadow: -2px 2px 0px lightblue;
  border: none;
  border-radius: 1px 3px;
}

`}
      </style>
      <div
        className="container-fliud"
        style={{ overflow: "auto", maxHeight: "calc(100vh - 87px)" }}
      >
        <div className="my-2">
          <h1 className="text-center">Patient Treatment Form</h1>
        </div>

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
                <form action="">
                  <fieldset disabled>
                    <div className="form-row">
                      <div className="form-group col-sm-12 col-md-6 col-lg-3">
                        <label>Patient ID</label>
                        <input
                          type="text"
                          value={patient.customId}
                          className="form-control"
                          readOnly
                        />
                      </div>
                      <div className="form-group col-sm-12 col-md-6 col-lg-3">
                        <label>Name</label>
                        <input
                          type="text"
                          value={patient.name}
                          className="form-control"
                          readOnly
                        />
                      </div>
                      <div className="form-group col-sm-12 col-md-6 col-lg-3">
                        <label>Age</label>
                        <input
                          type="text"
                          value={patient.age}
                          className="form-control"
                          readOnly
                        />
                      </div>
                      <div className="form-group col-sm-12 col-md-6 col-lg-3">
                        <label>Gender</label>
                        <input
                          type="text"
                          value={patient.gender}
                          className="form-control"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-sm-12 col-md-6 col-lg-3">
                        <label>UHID No.</label>
                        <input
                          type="text"
                          value={patient.uhid}
                          className="form-control"
                          readOnly
                        />
                      </div>
                      <div className="form-group col-sm-12 col-md-6 col-lg-3">
                        <label>IP No.</label>
                        <input
                          type="text"
                          value={patient.ip}
                          className="form-control"
                          readOnly
                        />
                      </div>
                      <div className="form-group col-sm-12 col-md-6 col-lg-3">
                        <label>Email ID</label>
                        <input
                          type="text"
                          value={patient.email}
                          className="form-control"
                          readOnly
                        />
                      </div>
                      <div className="form-group col-sm-12 col-md-6 col-lg-3">
                        <label>Mobile No.</label>
                        <input
                          type="text"
                          value={patient.mobileNo}
                          className="form-control"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-sm-12 col-md-6 col-lg-3">
                        <label>Occupation</label>
                        <input
                          type="text"
                          value={patient.occupation}
                          className="form-control"
                          readOnly
                        />
                      </div>
                      <div className="form-group col-sm-12 col-md-6 col-lg-3">
                        <label>Admission Status</label>
                        <input
                          type="text"
                          value={patient.status}
                          className="form-control"
                          readOnly
                        />
                      </div>
                      {/* <div className="form-group col-sm-12 col-md-6 col-lg-3">
                                            <label>Email ID</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="form-group col-sm-12 col-md-6 col-lg-3">
                                            <label>Mobile No.</label>
                                            <input type="text" className="form-control" />
                                        </div> */}
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="my-4 border rounded-top">
            <div className=" bg-info px-3 py-2 rounded-top">
              <div className="row d-flex justify-content-between">
                <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center justify-content-md-start my-1">
                  <h3 className="m-0 text-white text-sm-center">Cycle Test</h3>
                </div>

                <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center justify-content-md-end  my-1">
                  {/* ******************  Multi date select ***************** */}
                  <DatePicker
                    className="rmdp-mobile teal"
                    value={selectedDates}
                    onChange={(value) => {
                      dateFun(value); // Call the provided dateFun callback
                      setSelectedDates(value); // Save the selected dates for DatePicker 2
                      // console.log("value:", value);
                      setDateValue(value);
                    }}
                    mapDays={({ date, today, selectedDate }) => {
                      let props = {};
                      if (isAllDateDisabled(date)) {
                        props.disabled = true;
                        props.style = { color: "#ccc", pointerEvents: "none" };
                      }
                      return props;
                    }}
                    multiple
                    format="DD / MM / YYYY"
                    sort
                    plugins={[
                      <DatePanel key="date-panel" header="Selected Date" />,
                    ]}
                    minDate={new Date()}
                    render={(dateValue, openCalendar) => {
                      return (
                        <>
                          <button
                            className="btn btn-light"
                            onClick={(e) => {
                              e.preventDefault(); // Prevent the default behavior
                              openCalendar(); // Call the openCalendar function to open the date picker
                            }}
                          >
                            Create Cycle
                          </button>
                        </>
                      );
                    }}
                  />
                </div>
              </div>
            </div>

            <div className=" my-3 mx-4">
              {/* ========== show cycle test list start  ============== */}
              <div className="justify-content-center justify-content-lg-start">
                {cycleTestLists && cycleTestLists.length > 0 ? (
                  cycleTestLists.map((item, id) => (
                    <>
                      <button
                        key={id}
                        className={`btn  shadow-sm text-black  mx-1 mx-md-1 my-1 ${item?.cycleTestName === dateList?.cycleTestName ? ' btn-info  ' : ' btn-light border border-dark'}`}
                        style={{ color: 'black !important' }}
                        onClick={() => {
                          setCycleTestData(item);
                          setDateList(item);
                          setSelectedCycleTestName(item?.cycleTestName);
                        }}
                      >
                        {item?.cycleTestName}
                      </button>
                    </>
                  ))
                ) : (
                  <p className="text-center text-danger">No Cycle test</p>
                )}
              </div>
              {/* ==========   cycle test  list end    ============== */}

              {cycleTestLists && cycleTestLists.length > 0 && (
                <div className="my-4 border rounded-top">
                  <div className="bg-info px-3 py-2 rounded-top">
                    <div className="row d-flex justify-content-between">
                      <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center  justify-content-md-start my-1">
                        <h3 className="m-0 text-white text-sm-center">
                          {dateList?.cycleTestName} Dates
                        </h3>
                      </div>
                      <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center justify-content-md-end  my-1">
                        {/* ******************  Add Extra date creating ***************** */}

                        <DatePicker
                          className="rmdp-mobile teal"
                          // value={selectedParticularDate?.dates}
                          onChange={dateFun2}
                          sort
                          minDate={new Date()}
                          format="DD - MM - YYYY"
                          mapDays={({ date, today, selectedDate }) => {
                            let props = {};
                            if (isDateDisabledCycleTest(date)) {
                              props.disabled = true;
                              props.style = {
                                color: "gray",
                                pointerEvents: "none",
                                backgroundColor: "#4db6ac4a",
                              };
                            }
                            return props;
                          }}
                          render={(dateValue, openCalendar) => {
                            return (
                              <button
                                className="btn btn-light"
                                onClick={(e) => {
                                  openCalendar();
                                }}
                                disabled={!dateList}
                              >
                                Add Date
                              </button>
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className=" my-3">
                    <div className="px-3">
                      {dateList &&
                        dateList.appointmentDates &&
                        dateList.appointmentDates.length > 0 ? (
                        [...dateList.appointmentDates]
                          .sort((a, b) => new Date(a.date) - new Date(b.date))
                          .map((appointment, id, sortedAppointments) => {
                            // Check if any of the relevant fields have data
                            const AlreadyHaveData =
                              (appointment.premedicationItems &&
                                appointment.premedicationItems.length > 0) ||
                              (appointment.takeHomeItems &&
                                appointment.takeHomeItems.length > 0) ||
                              (appointment.generalInfo &&
                                Object.keys(appointment.generalInfo).length >
                                0) ||
                              (appointment.chemotherapyItems &&
                                appointment.chemotherapyItems.length > 0);

                            const currentAppointmentDate = appointment.date;

                            const nextAppointmentDate =
                              id < sortedAppointments.length - 1
                                ? sortedAppointments[id + 1].date
                                : null;

                            const isCurrentAppointmentDateLessThanNext =
                              nextAppointmentDate
                                ? currentAppointmentDate < nextAppointmentDate
                                : false;

                            console.log("sadadda", dateList?.cycleTestName);

                            // don't have date btn  functionalty
                            // buttonClass = 'text-white btn btn-danger mx-1 mx-md-1 my-1';
                            // buttonClass = 'text-white btn btn-success secondary mx-1 mx-md-1 my-1';

                            // *************************  Aready Dont Have Data functionality *************************

                            let buttonForNotHaveDataClassbtn = "";
                            let buttonForNotHaveDataStyle = {};
                            let buttonForNotHaveDataNavigate = false;

                            if (nextAppointmentDate == null) {
                              if (currentAppointmentDate >= todayDate) {
                                buttonForNotHaveDataClassbtn =
                                  "text-white btn btn-success mx-1 mx-md-1 my-1";
                                buttonForNotHaveDataStyle = {
                                  boxShadow: " 0px 0px 3px black",
                                  pointerEvents: "auto",
                                  opacity: 1,
                                };
                                buttonForNotHaveDataNavigate = true;
                              } else {
                                buttonForNotHaveDataClassbtn =
                                  "text-white btn btn-danger mx-1 mx-md-1 my-1";
                                buttonForNotHaveDataStyle = {
                                  boxShadow: " 0px 0px 3px black",
                                  // pointerEvents: 'none',
                                  // opacity: 0.5
                                };
                                buttonForNotHaveDataNavigate = false;
                              }
                            } else {
                              if (
                                currentAppointmentDate < nextAppointmentDate &&
                                todayDate <= currentAppointmentDate
                              ) {
                                buttonForNotHaveDataClassbtn =
                                  "text-white btn btn-success mx-1 mx-md-1 my-1";
                                buttonForNotHaveDataStyle = {
                                  boxShadow: " 0px 0px 3px black",
                                  pointerEvents: "auto",
                                  opacity: 1,
                                };
                                buttonForNotHaveDataNavigate = true;
                              } else {
                                buttonForNotHaveDataClassbtn =
                                  "text-white btn btn-danger mx-1 mx-md-1 my-1";
                                buttonForNotHaveDataStyle = {
                                  boxShadow: " 0px 0px 3px black",
                                  // pointerEvents: 'none',
                                  // opacity: 0.5
                                };
                                buttonForNotHaveDataNavigate = false;
                              }
                            }

                            // *************************  Aready Dont Have Data functionality *************************

                            // if ((currentAppointmentDate <= todayDate && isCurrentAppointmentDateLessThanNext)) {
                            //   // buttonClass = 'text-white btn btn-danger mx-1 mx-md-1 my-1';

                            //   if (nextAppointmentDate == null) {
                            //     buttonClass = 'text-white btn btn-success mx-1 mx-md-1 my-1';

                            //   }else{
                            //     buttonClass = 'text-white btn btn-danger mx-1 mx-md-1 my-1';

                            //   }

                            // } else {

                            //   if (nextAppointmentDate == null) {
                            //     buttonClass = 'text-white btn btn-danger mx-1 mx-md-1 my-1';
                            //   } else {
                            //     buttonClass = 'text-white btn btn-success mx-1 mx-md-1 my-1';

                            //   }
                            // }

                            // *************************  Aready  Have Data functionality *************************

                            let buttonForHaveDataClassbtn = "";
                            let buttonForHaveDataNavigate = false;
                            if (nextAppointmentDate == null) {
                              if (todayDate <= currentAppointmentDate) {
                                buttonForHaveDataClassbtn =
                                  "text-white btn btn-primary mx-1 mx-md-1 my-1";
                                buttonForHaveDataNavigate = true;
                              } else {
                                // check to clearify with boss
                                buttonForHaveDataClassbtn =
                                  "text-white btn btn-secondary mx-1 mx-md-1 my-1";
                                buttonForHaveDataNavigate = false;
                              }
                            } else {
                              if (
                                currentAppointmentDate < nextAppointmentDate &&
                                nextAppointmentDate > todayDate && todayDate <= currentAppointmentDate
                              ) {
                                buttonForHaveDataClassbtn =
                                  `text-white btn btn-primary mx-1 mx-md-1 my-1`;
                                buttonForHaveDataNavigate = true;
                              } else {
                                buttonForHaveDataClassbtn =
                                  "text-white btn btn-secondary mx-1 mx-md-1 my-1";
                                buttonForHaveDataNavigate = false;
                              }
                            }
                            // *************************  Aready Have Data functionality *************************

                            return (
                              <>
                                {AlreadyHaveData ? (
                                  <>
                                    <Link
                                      key={id}
                                      className={buttonForHaveDataClassbtn}
                                      to={
                                        buttonForHaveDataNavigate
                                          ? `/dashboard/allPatients/f1/edit?patient_id=${patient._id
                                          }&cycleName=${cycleTestName}&date_id=${appointment._id
                                          }&date=${appointment.date}&day=${id + 1
                                          }`
                                          : `/dashboard/allPatients/f1/view?patient_id=${patient._id
                                          }&cycleTestName=${cycleTestName}&date=${appointment.date
                                          }&date_id=${appointment._id}&day=${id + 1
                                          }`
                                      }
                                      style={{
                                        boxShadow: " 0px 0px 3px black",
                                      }}
                                    >
                                      <div className="d-flex">
                                        <p className="mb-0 customBtn">
                                          Day - {id + 1}{" "}
                                          <button
                                            type="button"
                                            className=" dateDeleteBtn badge badge-light px-2 py-1"
                                            onClick={(e) =>
                                              handleButtonClick(
                                                e,
                                                product_id,
                                                dateList?.cycleTestName,
                                                appointment?.date
                                              )
                                            }
                                          >
                                            {" "}
                                            <Trash3Fill />{" "}
                                          </button>
                                        </p>
                                      </div>
                                      {appointment.date}
                                    </Link>
                                  </>
                                ) : (
                                  <>
                                    <Link
                                      key={id}
                                      style={{
                                        ...buttonForNotHaveDataStyle,
                                        cursor: "default",
                                      }}
                                      className={buttonForNotHaveDataClassbtn}
                                      to={
                                        buttonForNotHaveDataNavigate
                                          ? `/dashboard/allPatients/f1/f2?product_id=${patient._id
                                          }&cycleName=${cycleTestName}&date_id=${appointment._id
                                          }&day=${id + 1}`
                                          : `/dashboard/allPatients/f1?product_id=${patient._id}`
                                      }
                                    >
                                      <div className="d-flex">
                                        <p className="mb-0">
                                          Day - {id + 1}{" "}
                                          <button
                                            type="button"
                                            className=" dateDeleteBtn badge badge-light px-2 py-1"
                                            onClick={(e) =>
                                              handleButtonClick(
                                                e,
                                                product_id,
                                                dateList?.cycleTestName,
                                                appointment?.date
                                              )
                                            }
                                          >
                                            {" "}
                                            <Trash3Fill />{" "}
                                          </button>
                                        </p>
                                      </div>
                                      {appointment.date}
                                    </Link>
                                  </>
                                )}
                              </>
                            );
                          })
                      ) : (
                        <p className="text-center">No Date</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-between py-4">
            <button
              type="button"
              className="btn btn-info px-md-5"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormOne;
