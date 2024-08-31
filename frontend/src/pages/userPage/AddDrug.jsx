import React, { useEffect, useState } from "react";
import {
  Capsule,
  HospitalFill,
  PencilSquare,
  PlusSquareFill,
  Prescription2,
  Trash3Fill,
} from "react-bootstrap-icons";
import {
  PremedicationInsertForm,
  PremedicationUpdateForm,
  ChemoInsertForm,
  ChemoUpdateForm,
  TakeHomeInsertForm,
  TakeHomeUpdateForm,
} from "../../components/doctorComponents/AllForm.js";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteChemoDrug,
  deletePremedicationDrug,
  deleteTakeHomeDrug,
  getChemoDrug,
  getChemotherapyDrugs,
  getPremedicationDrug,
  getTakeHomeDrug,
  getTakeHomeDrugs,
} from "../../redux/actions/drugAction.js";
import DataTable from "react-data-table-component";
import { premedicationClearMessages } from "../../redux/slices/preDrugSlice.js";
import { chemoClearMessages } from "../../redux/slices/chemoDrugSlice.js";
import { takeHomeClearMessages } from "../../redux/slices/takeHomeDrugSlice.js";
import { useNavigate } from "react-router-dom";

const AddDrug = () => {
  const dispatch = useDispatch();
  //connect to store , fetct premedication data from Database
  const {
    preDrugsCount,
    preDrugs,
    isLoading: preLoading,
  } = useSelector((state) => state?.preDrugData);
  // const premedicationDataCount = preDrugsCount.length;
  //connect to store , fetct premedication data from Database
  // const fetchChemoDrug = useSelector((state) => state?.chemoDrugData);
  const { chemoDrugs, chemoDrugsCount, isLoading: chemoLoading } = useSelector(
    (state) => state?.chemoDrugData
  );

  const { takeHomeDrugsCount, takeHomeDrugs, isLoading: takehomeLoading } = useSelector(
    (state) => state?.takeHomeDrugData
  );

  console.log("takeHomeDrugsCount:", chemoDrugsCount);
  console.log("takeHomeDrugs:", chemoDrugs);

  const navigate = useNavigate();

  // stored data
  const [preData, setPreData] = useState([]);
  const [chemoData, setChemoData] = useState([]);
  const [takeHomeData, setTakeHomeData] = useState([]);

  // update stored data
  const [preDataUpdateID, setPreDataUpdateID] = useState([]);
  const [chemoDataUpdateID, setChemoDataUpdateID] = useState({});
  const [takeHomeDataUpdateID, setTakeHomeDataUpdateID] = useState([]);

  // useEffect(() => {
  //   dispatch(getPremedicationDrug());
  //   dispatch(getChemotherapyDrugs());
  //   dispatch(getTakeHomeDrugs());
  // }, [dispatch])

  const premedicationData = preDrugs;
  // console.log("All Pre Data:", chemoData);

  const chemotherapyData = chemoDrugs;
  // console.log("All Chemo Data:", chemoData);

  console.log("chemotherapyData:", chemotherapyData);

  const takeHomesData = takeHomeDrugs;
  // console.log("All Take Home Data:", takeHomesData);

  useEffect(() => {
    setPreData(premedicationData);
    setChemoData(chemotherapyData);
    setTakeHomeData(takeHomesData);
  }, [premedicationData, chemotherapyData, takeHomesData]);

  // *************** Premedication record delete logic ****************

  const { isPreDeleteSuccessMsg, isPreDeleteErrorMsg } = useSelector(
    (state) => state?.preDrugData
  );
  const handleDeletePremeditionRecords = async (id) => {
    if (window.confirm("Are you sure wanna Delete in Premedicaiton Items ?")) {
      dispatch(deletePremedicationDrug(id, preDrugPerPage, currentPrePage));
    }
  };

  // toastify Premedication record delete
  useEffect(() => {
    if (isPreDeleteSuccessMsg) {
      if (isPreDeleteErrorMsg) {
        toast.error(isPreDeleteErrorMsg, {
          // delay: 1000,
          // hideProgressBar: true
        });
        setTimeout(() => {
          dispatch(premedicationClearMessages());
        }, 100);
        return;
      }
      toast.success(isPreDeleteSuccessMsg, {
        // delay: 1000,
        // hideProgressBar: true
      });
      setTimeout(() => {
        dispatch(premedicationClearMessages());
      }, 100);
    }
  }, [isPreDeleteSuccessMsg, isPreDeleteErrorMsg]);

  // *************** chemotherapy record delete logic ****************
  const { isChemoDeleteSuccessMsg, isChemoDeleteErrorMsg } = useSelector(
    (state) => state?.chemoDrugData
  );
  const handleDeleteChemoRecord = async (id) => {
    if (window.confirm("Are you sure wanna Delete in Chemotherapy Item ?")) {
      dispatch(deleteChemoDrug(id, currentChemoPage, chemoDrugPerPage));
    }
  };

  // toastify Chemo record delete
  useEffect(() => {
    if (isChemoDeleteSuccessMsg) {
      if (isChemoDeleteErrorMsg) {
        toast.error(isChemoDeleteErrorMsg, {
          // delay: 1000,
          // hideProgressBar: true
        });
        setTimeout(() => {
          dispatch(chemoClearMessages());
        }, 100);
        return;
      }
      toast.success(isChemoDeleteSuccessMsg, {
        // delay: 1000,
        // hideProgressBar: true
      });
      setTimeout(() => {
        dispatch(chemoClearMessages());
      }, 100);
    }
  }, [isChemoDeleteSuccessMsg, isChemoDeleteErrorMsg]);

  // *************** Take HOme record delete logic ****************
  const { isTakeHomeDeleteSuccessMsg, isTakeHomeDeleteErrorMsg } = useSelector(
    (state) => state?.takeHomeDrugData
  );
  const handleDeleteTakeHomeRecord = async (id) => {
    if (window.confirm("Are you sure wanna Delete in Takehome Items?")) {
      console.log("Delete:", id);
      dispatch(deleteTakeHomeDrug(id, currentTakeHomePage, takeHomeDrugPerPage));
    }
  };

  useEffect(() => {
    if (isTakeHomeDeleteSuccessMsg) {
      if (isTakeHomeDeleteErrorMsg) {
        toast.error(isTakeHomeDeleteErrorMsg, {
          // delay: 1000,
          // hideProgressBar: true
        });
        setTimeout(() => {
          dispatch(takeHomeClearMessages());
        }, 100);
        return;
      }
      toast.success(isTakeHomeDeleteSuccessMsg, {
        // delay: 1000,
        // hideProgressBar: true
      });
      setTimeout(() => {
        dispatch(takeHomeClearMessages());
      }, 100);
    }
  }, [isTakeHomeDeleteSuccessMsg, isTakeHomeDeleteErrorMsg]);

  // ============ table Header items list =============

  const preColumns = [
    {
      name: "Drug Type",
      selector: (row) => `${row.drugType}. ${row.drugName}`,
      sortable: true,
      grow: 1.7,
    },
    {
      name: "Brand",
      selector: (row) => row.brandName,
      sortable: true,
      // grow: 1.7,
    },
    {
      name: "Dose",
      selector: (row) => row.doseValue,
      grow: .5,
    },
    {
      name: "Unit",
      selector: (row) => row.unit,
      grow: .5,
    },
    {
      name: "Duration (days)",
      selector: (row) => {
        const days = row.duration;
        if (days === 0) {
          return '0 days';
        }
        return `${days} ${days === 1 ? 'day' : 'days'}`;
      }
    },
    {
      name: "Frequency",
      selector: (row) => `${row.frequency[0]} - ${row.frequency[1]} - ${row.frequency[2]}`,
      grow: .5,
    },
    {
      name: "Administraion Details",
      selector: (row) => row.details,
      grow: 1.5,
    },
    {
      name: "Operation",
      cell: (item) => (
        <div className="">
          <button
            // data-toggle="modal"
            // data-target="#PremedicationUpdateForm"
            type="button"
            className="btn btn-primary btn-sm  mr-1 mr-xl-3"
            onClick={() => {
              setPreDataUpdateID(item);
              handlePreModelShow();
            }}
          >
            <PencilSquare />
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm  mr-1 mr-xl-3"
            onClick={() => handleDeletePremeditionRecords(item._id)}
          >
            <Trash3Fill />
          </button>
        </div>
      ),
    },
  ];

  const chemoColumns = [
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
      name: "Dose Range / unit",
      selector: (row) =>
        `${row.doseRangeA} - ${row.doseRangeB} ${row.doseUnit}`,
    },
    {
      name: "Dilution pct.(%)",
      selector: (row) => `${row.dosePct} %`,
    },
    {
      name: "Route",
      selector: (row) => row.route,
      grow: .3,
    },
    {
      name: "Duration(hrs)",
      selector: (row) => `${row.duration} hrs`,
      grow: .5,
    },
    {
      name: "Dilution Volume (ml)",
      selector: (row) => `${row.dilution} ml`,
      grow: .4,
    },
    {
      name: "Administraion Details",
      selector: (row) => row.details,
      grow: 1.4,
    },
    {
      name: "Operation",
      cell: (item) => (
        <div className="">
          <button
            data-toggle="modal"
            data-target="#ChemotherapyUpdateForm"
            type="button"
            className="btn btn-primary btn-sm  mr-1 mr-xl-3"
            onClick={() => {
              setChemoDataUpdateID(item);
              handleChemoModelShow();
            }}
          >
            <PencilSquare />
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm  mr-1 mr-xl-3"
            onClick={() => handleDeleteChemoRecord(item._id)}
          >
            <Trash3Fill />
          </button>
        </div>
      ),
    },
  ];

  const takeHomeColumns = [
    {
      name: "Drug Name",
      selector: (row) => `${row.drugType}. ${row.drugName}`,
      sortable: true,
      grow: 1.7,
    },
    {
      name: "Brand",
      selector: (row) => row.brandName,
      sortable: true,
      // grow: 1.5,
    },
    {
      name: "Dose",
      selector: (row) => row.doseValue,
      grow: .5,
    },
    {
      name: "Unit",
      selector: (row) => row.unit,
      grow: .5,
    },
    {
      name: "Duration (days)",
      selector: (row) => {
        const days = row.duration;
        if (days === 0) {
          return '0 days';
        }
        return `${days} ${days === 1 ? 'day' : 'days'}`;
      }
    },
    {
      name: "Frequency",
      selector: (row) =>
        `${row.frequency[0]} - ${row.frequency[1]} - ${row.frequency[2]}`,
      grow: .5,
    },
    {
      name: "Administraion Details",
      selector: (row) => row.details,
      grow: 1.5,
    },
    {
      name: "Operation",
      cell: (item) => (
        <div className="">
          <button
            data-toggle="modal"
            data-target="#TakeHomeUpdateForm"
            type="button"
            className="btn btn-primary btn-sm  mr-1 mr-xl-3"
            onClick={() => {
              setTakeHomeDataUpdateID(item);
              handleTakeHomeModelShow();
            }}
          >
            <PencilSquare />
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm  mr-1 mr-xl-3"
            onClick={() => handleDeleteTakeHomeRecord(item._id)}
          >
            <Trash3Fill />
          </button>
        </div>
      ),
    },
  ];

  const preTableData = preData?.map((item) => {
    return {
      _id: item._id,
      drugType: item.drugType,
      drugName: item.drugName,
      brandName: item.brandName,
      doseValue: item.doseValue,
      unit: item.unit,
      duration: item.duration,
      frequency: item.frequency,
      details: item.details,
    };
  });

  const chemoTableData = chemoData?.map((item) => {
    return {
      _id: item._id,
      drugType: item.drugType,
      drugName: item.drugName,
      doseRangeA: item.doseRangeA,
      doseRangeB: item.doseRangeB,
      doseUnit: item.doseUnit,
      dilution: item.dilution,
      dosePct: item.dosePct,
      brandName: item.brandName,
      route: item.route,
      duration: item.duration,
      details: item.details,
    };
  });

  const takeHomeTableData = takeHomeData?.map((item) => {
    return {
      _id: item._id,
      drugType: item.drugType,
      drugName: item.drugName,
      brandName: item.brandName,
      doseValue: item.doseValue,
      unit: item.unit,
      duration: item.duration,
      frequency: item.frequency,
      details: item.details,
    };
  });

  // ====== Table header style ======
  const customTableStyle = {
    rows: {
      style: {
        fontSize: "15px",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#c1e6e9",
        fontSize: "16px",
      },
    },
  };

  // model for the like pre  update fielda
  const [showPreModel, setShowPreModel] = useState(false);
  const handlePreModelClose = () => setShowPreModel(false);
  const handlePreModelShow = () => setShowPreModel(true);

  // model for the like chemo, takehome update fielda
  const [showChemoModel, setShowChemoModel] = useState(false);
  const handleChemoModelClose = () => setShowChemoModel(false);
  const handleChemoModelShow = () => setShowChemoModel(true);

  // model for the like chemo, takehome update fielda
  const [showTakeHomeModel, setShowTakeHomeModel] = useState(false);
  const handleTakeHomeModelClose = () => setShowTakeHomeModel(false);
  const handleTakeHomeModelShow = () => setShowTakeHomeModel(true);

  // *************** premedication Pagination start **********

  const [preDrugPerPage, setPreDrugPerPage] = useState(5);
  const [currentPrePage, setCurrentPrePage] = useState(1);
  const [searchPreData, setSearchPreData] = useState(""); // value

  const handlePremedicationPageChange = (page) => {
    setCurrentPrePage(page);
  };

  const handlePremedicationPerRowsChange = (newPerPage, page) => {
    setPreDrugPerPage(newPerPage);
    setCurrentPrePage(page);
  };

  const handleSearchChangePremedicaitonData = (event) => {
    setSearchPreData(event.target.value);
    setCurrentPrePage(1); // Reset to the first page on search
  };

  useEffect(() => {
    dispatch(
      getPremedicationDrug(currentPrePage, preDrugPerPage, searchPreData)
    );
  }, [currentPrePage, preDrugPerPage, searchPreData, dispatch]);

  // *************** premedication Pagination end **********

  // *************** Chemotherapy Pagination start **********
  const [chemoDrugPerPage, setChemoDrugPerPage] = useState(5);
  const [currentChemoPage, setCurrentChemoPage] = useState(1);
  const [searchChemoData, setSearchChemoData] = useState(""); // value

  // console.log("chemoDrugPerPage:", chemoDrugPerPage);
  // console.log("currentChemoPage:", currentChemoPage);

  const handleChemotherapyPageChange = (page) => {
    setCurrentChemoPage(page);
  };

  const handleChemotherapyPerRowsChange = (newPerPage, page) => {
    setChemoDrugPerPage(newPerPage); // per page
    setCurrentChemoPage(page);
  };

  const handleSearchChangeChemotherapyData = (event) => {
    setSearchChemoData(event.target.value);
    setCurrentChemoPage(1); // Reset to the first page on search
  };

  useEffect(() => {
    dispatch(
      getChemotherapyDrugs(currentChemoPage, chemoDrugPerPage, searchChemoData)
    );
  }, [currentChemoPage, chemoDrugPerPage, searchChemoData, dispatch]);

  // *************** Chemotherapy Pagination end **********

  // *************** Take Home Pagination start **********
  const [takeHomeDrugPerPage, setTakeHomeDrugPerPage] = useState(5);
  const [currentTakeHomePage, setCurrentTakeHomePage] = useState(1);
  const [searchTakeHomeData, setSearchTakeHomeData] = useState(""); // value

  const handleTakeHomePageChange = (page) => {
    setCurrentTakeHomePage(page);
  };

  const handleTakeHomePerRowsChange = (newPerPage, page) => {
    setTakeHomeDrugPerPage(newPerPage);
    setCurrentTakeHomePage(page);
  };

  const handleSearchChangeTakeHomeData = (event) => {
    setSearchTakeHomeData(event.target.value);
    setCurrentTakeHomePage(1); // Reset to the first page on search
  };

  useEffect(() => {
    dispatch(
      getTakeHomeDrugs(
        currentTakeHomePage,
        takeHomeDrugPerPage,
        searchTakeHomeData
      )
    );
  }, [currentTakeHomePage, takeHomeDrugPerPage, searchTakeHomeData, dispatch]);

  // ***************  Take Home Pagination end **********

  return (
    <>
      <div className="container-fluid">
        <div className="mx-3 my-3">
          <div
            className="row py-md-1 align-items-center "
            style={{ backgroundColor: "#8ddee5", borderRadius: "5px" }}
          >
            <div className="col text-center py-3">
              <p className="h4 m-0">Add Medicine </p>
            </div>
          </div>
        </div>
        {/* ================= Premedication form ========= */}
        <PremedicationInsertForm preData={preData} setPreData={setPreData} />
        <PremedicationUpdateForm
          showPreModel={showPreModel}
          handlePreModelClose={handlePreModelClose}
          handlePreModelShow={handlePreModelShow}
          setShowPreModel={setShowPreModel}
          item={preDataUpdateID}
          preData={preData}
          setPreData={setPreData}
          currentPrePage={currentPrePage}
          preDrugPerPage={preDrugPerPage}
        />

        <ChemoInsertForm chemoData={chemoData} setChemoData={setChemoData} />

        <ChemoUpdateForm
          showChemoModel={showChemoModel}
          handleChemoModelClose={handleChemoModelClose}
          handleChemoModelShow={handleChemoModelShow}
          setShowChemoModel={setShowChemoModel}
          item={chemoDataUpdateID}
          chemoData={chemoData}
          setChemoData={setChemoData}
          currentChemoPage={currentChemoPage}
          chemoDrugPerPage={chemoDrugPerPage}
        />

        <TakeHomeInsertForm
          takeHomeData={takeHomeData}
          setTakeHomeData={setTakeHomeData}
        />
        <TakeHomeUpdateForm
          showTakeHomeModel={showTakeHomeModel}
          handleTakeHomeModelClose={handleTakeHomeModelClose}
          handleTakeHomeModelShow={handleTakeHomeModelShow}
          setShowTakeHomeModel={setShowTakeHomeModel}
          item={takeHomeDataUpdateID}
          takeHomeData={takeHomeData}
          setTakeHomeData={setTakeHomeData}
          takeHomeDrugPerPage={takeHomeDrugPerPage}
          currentTakeHomePage={currentTakeHomePage}
        />
        {/* ================= Take Home Medication Items form ========= */}

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
                      Premedication <br /> Items
                    </h5>
                    <h5 className="card-title font-weight-bold h3">
                      {preDrugsCount ? preDrugsCount : "0"}
                    </h5>
                    <p className="card-text">Records</p>
                  </div>
                  <div className="card-footer">
                    <button
                      type="button"
                      className="btn btn-info btn-block"
                      data-toggle="modal"
                      data-target="#PremedicationForm"
                    >
                      Add Items
                    </button>
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
                      Chemotherapy <br /> Administration Items
                    </h5>
                    <h5 className="card-title font-weight-bold h3">
                      {chemoDrugsCount ? chemoDrugsCount : "0"}
                    </h5>
                    <p className="card-text">Records</p>
                  </div>
                  <div className="card-footer">
                    <button
                      type="button"
                      className="btn btn-info btn-block"
                      data-toggle="modal"
                      data-target="#ChemotherapyForm"
                    >
                      Add Items
                    </button>
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
                    <Prescription2
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
                      Take Home <br /> Medication Items
                    </h5>
                    <h5 className="card-title font-weight-bold h3">

                      {takeHomeDrugsCount ? takeHomeDrugsCount : "0"}
                    </h5>
                    <p className="card-text">Records</p>
                  </div>
                  <div className="card-footer">
                    <button
                      type="button"
                      className="btn btn-info btn-block"
                      data-toggle="modal"
                      data-target="#TakeHomeMedicationForm"
                    >
                      Add Items
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" container-fluid my-3 p-0 ">
          {/* =========================== Premedication  Table Start ================== */}

          <div className=" my-2">
            <div className="  bg-info px-3 py-2 rounded-top">
              <div className="row d-flex  ">
                <div className="col-md-6">
                  <div className=" d-flex align-items-center">
                    <h3 className="m-0 text-white">Premedication Items</h3>
                  </div>
                </div>
                <div className="col-md-6 ">
                  <div className="d-flex align-items-center justify-content-end">
                    <div className="mr-2">
                      <input
                        className="form-control"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={handleSearchChangePremedicaitonData}
                      />
                    </div>
                    <button
                      className="btn btn-success py-2"
                      style={{ boxShadow: "0px 0px 9px 1px white" }}
                      data-toggle="modal"
                      data-target="#PremedicationForm"
                    >
                      <PlusSquareFill className="d-flex align-items-center " />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <DataTable
              showGridlines
              className="border"
              columns={preColumns}
              data={preTableData}
              striped={true}
              pagination
              customStyles={customTableStyle}
              selectableRowsHighlight
              highlightOnHover
              // pagination content
              progressPending={preLoading}
              paginationServer // Use server-side pagination if needed
              paginationRowsPerPageOptions={[5, 10, 15, 20]}
              paginationDefaultPage={currentPrePage} // Default page start with 1
              onChangePage={handlePremedicationPageChange} // // Handle page change
              paginationTotalRows={preDrugsCount} // Total number of rows for pagination
              paginationPerPage={preDrugPerPage} // Ensure default rows per page is set to 5
              onChangeRowsPerPage={handlePremedicationPerRowsChange} // per page how many pages do u want
            />
          </div>
          {/* =========================== Premedication  Table End ================== */}

          {/* =========================== chemo  Table Start ================== */}

          <div className=" my-2">
            <div className="  bg-info px-3 py-2 rounded-top">
              <div className="row d-flex  ">
                <div className="col-md-6">
                  <div className=" d-flex align-items-center">
                    <h3 className="m-0 text-white">Chemotherapy Items</h3>
                  </div>
                </div>
                <div className="col-md-6 ">
                  <div className="d-flex align-items-center justify-content-end">
                    <div className="mr-2">
                      <input
                        className="form-control"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={handleSearchChangeChemotherapyData}
                      />
                    </div>
                    <button
                      className="btn btn-success py-2"
                      style={{ boxShadow: "0px 0px 9px 1px white" }}
                      data-toggle="modal"
                      data-target="#ChemotherapyForm"
                    >
                      <PlusSquareFill className="d-flex align-items-center " />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <DataTable
              showGridlines
              className="border"
              columns={chemoColumns}
              data={chemoTableData}
              striped={true}
              pagination
              customStyles={customTableStyle}
              progressPending={chemoLoading}
              selectableRowsHighlight
              highlightOnHover
              // pagination content
              paginationServer // Use server-side pagination if needed
              paginationRowsPerPageOptions={[5, 10, 15, 20]}
              paginationDefaultPage={currentChemoPage} // Default page start with 1
              onChangePage={handleChemotherapyPageChange} // // Handle page change
              paginationTotalRows={chemoDrugsCount} // Total number of rows for pagination
              paginationPerPage={chemoDrugPerPage} // Ensure default rows per page is set to 5
              onChangeRowsPerPage={handleChemotherapyPerRowsChange} // per page how many pages do u want
            />
          </div>
          {/* =========================== Chemo  Table End ================== */}
          {/* =========================== Take Home  Table Start ================== */}

          <div className=" my-2">
            <div className="  bg-info px-3 py-2 rounded-top">
              <div className="row d-flex  ">
                <div className="col-md-6">
                  <div className=" d-flex align-items-center">
                    <h3 className="m-0 text-white">Take Home Items</h3>
                  </div>
                </div>
                <div className="col-md-6 ">
                  <div className="d-flex align-items-center justify-content-end">
                    <div className="mr-2">
                      <input
                        className="form-control"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={handleSearchChangeTakeHomeData}
                      />
                    </div>
                    <button
                      className="btn btn-success py-2"
                      style={{ boxShadow: "0px 0px 9px 1px white" }}
                      data-toggle="modal"
                      data-target="#TakeHomeMedicationForm"
                    >
                      <PlusSquareFill className="d-flex align-items-center " />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <DataTable
              showGridlines
              className="border"
              columns={takeHomeColumns}
              data={takeHomeTableData}
              striped={true}
              pagination
              progressPending={takehomeLoading}
              customStyles={customTableStyle}
              selectableRowsHighlight
              highlightOnHover
              // pagination content
              paginationServer // Use server-side pagination if needed
              paginationRowsPerPageOptions={[5, 10, 15, 20]}
              paginationDefaultPage={currentTakeHomePage} // Default page start with 1
              onChangePage={handleTakeHomePageChange} // // Handle page change
              paginationTotalRows={takeHomeDrugsCount} // Total number of rows for pagination
              paginationPerPage={takeHomeDrugPerPage} // Ensure default rows per page is set to 5
              onChangeRowsPerPage={handleTakeHomePerRowsChange} // per page how many pages do u want
            />
          </div>
          {/* =========================== Take Home  Table End ================== */}
        </div>

        <div className="d-flex justify-content-between pb-4 ">
          <div className="">
            <button type="button" className="btn btn-info bg-info px-5" onClick={() => navigate(-1)} >Back</button>
          </div>



        </div>

      </div>
    </>
  );
};

export default AddDrug;
