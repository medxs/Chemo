import React, { useEffect, useState } from "react";
import { PlusSquareFill, Trash3Fill } from "react-bootstrap-icons";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  getChemotherapyDrugs,
  getPremedicationDrug,
  getTakeHomeDrugs,
} from "../../../redux/actions/drugAction";
import { createNewMasterRecordValidation } from "../../../components/doctorComponents/AllValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  createMasterRecord,
  getCancerList,
} from "../../../redux/actions/masterRecordAction";
import { toast } from "react-toastify";
import { clearMasterMessage } from "../../../redux/slices/master-record-slices/masterRecordSlice";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../../components/Loader/Spinner";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Checkbox,
  Typography,
  Box,
} from "@mui/material";
import {
  ChemoInsertForm,
  PremedicationInsertForm,
  TakeHomeInsertForm,
} from "../../../components/doctorComponents/AllForm";

const CreateMasterRecord = () => {
  const [btns, setBtns] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    preDrugsCount,
    preDrugs,
    isLoading: preLoading,
  } = useSelector((state) => state?.preDrugData);

  const {
    chemoDrugs,
    chemoDrugsCount,
    isLoading: chemoLoading,
  } = useSelector((state) => state?.chemoDrugData);

  const {
    takeHomeDrugsCount,
    takeHomeDrugs,
    isLoading: takehomeLoading,
  } = useSelector((state) => state?.takeHomeDrugData);

  const { message, errMessage } = useSelector(
    (state) => state.masterRecordState
  );

  // get cancer list
  const { cancerList, regimenList } = useSelector(
    (state) => state.cancerDataState
  );
  // const { regimenList } = useSelector((state) => state.regimenDataState);

  console.log("cancerList:", cancerList);
  console.log("regimenList:", regimenList);

  // const premedicationData = fetchPreDrug?.preDrugs;
  const premedicationData = preDrugs;

  const chemotherapyData = chemoDrugs;
  // console.log("All Chemo Data:", chemotherapyData);

  const takeHomesData = takeHomeDrugs;
  // console.log("All Take Home Data:", takeHomesData);

  const [selectedPreDataLocal, setSelectedPreDataLocal] = useState([]);
  const [selectedChemoDataLocal, setSelectedChemoDataLocal] = useState([]);
  const [selectedTakeHomeDataLocal, setSelectedTakeHomeDataLocal] = useState(
    []
  );

  // ******** stored data **********
  const [preData, setPreData] = useState(
    premedicationData?.map((item) => {
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
        route: item.route,
        startTime: item.startTime,
        endTime: item.endTime,
        signature: item.signature,
      };
    })
  );

  const [chemoData, setChemoData] = useState(
    chemotherapyData?.map((item) => {
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
    })
  );

  const [takeHomeData, setTakeHomeData] = useState(
    takeHomesData?.map((item) => {
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
    })
  );

  useEffect(() => {
    dispatch(getCancerList());
  }, [dispatch]);

  useEffect(() => {
    setPreData(premedicationData);
    setChemoData(chemotherapyData);
    setTakeHomeData(takeHomesData);
  }, [premedicationData, chemotherapyData, takeHomesData]);

  //  ========== Premedication table Header items list  ==========
  const preColumns = [
    {
      name: "Drug Type",
      flex: 1,
      selector: (row) => `${row.drugType}. ${row.drugName}`,
      sortable: true,
      grow: 2,
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
      selector: (row) =>
        `${row.frequency[0]} - ${row.frequency[1]} - ${row.frequency[2]}`,
    },
    {
      name: "Administraion Details",
      selector: (row) => row.details,
      grow: 2,
    },

    {
      name: "Operation",
      cell: (item) => (
        <div className="">
          <button
            type="button"
            className="btn btn-danger btn-sm  mr-1 mr-xl-3"
            onClick={() => handleDeletePremeditionTreatmentRecords(item._id)}
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
      name: "Dilution Volume (ml)",
      selector: (row) => `${row.dilution} ml`,
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
            type="button"
            className="btn btn-danger btn-sm  mr-1 mr-xl-3"
            onClick={() => handleDeleteChemotherapyTreatmentRecords(item._id)}
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
      grow: 1.6,
    },
    {
      name: "Brand",
      selector: (row) => row.brandName,
      sortable: true,
    },
    {
      name: "Dose",
      selector: (row) => row.doseValue,
    },
    {
      name: "Unit",
      selector: (row) => row.unit,
    },
    {
      name: "Duration (days)",
      selector: (row) => `${row.duration} days`,
    },
    {
      name: "Frequency",
      selector: (row) =>
        `${row.frequency[0]} - ${row.frequency[1]} - ${row.frequency[2]}`,
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
            type="button"
            className="btn btn-danger btn-sm  mr-1 mr-xl-3"
            onClick={() => handleDeleteTakeHomeTreatmentRecords(item._id)}
          >
            <Trash3Fill />
          </button>
        </div>
      ),
    },
  ];

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
        fontSize: "15px",
      },
    },
  };

  // ===================== Premedication Table Data ====================================

  // ===================== Chemotherapy Table Data ====================================

  // ===================== Take Home Table Data ====================================

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(createNewMasterRecordValidation),
  });

  const [cancerType, setCancerType] = useState({});
  const [regimenType, setRegimenType] = useState({});
  console.log("regimenType:", regimenType);

  const validateSelections = () => {
    let errors = [];

    if (selectedPreDataLocal.length === 0) {
      errors.push("Pre-medication data is required.");
    }

    if (selectedChemoDataLocal.length === 0) {
      errors.push("Chemotherapy data is required.");
    }

    if (selectedTakeHomeDataLocal.length === 0) {
      errors.push("Take-home medication data is required.");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return false;
    }

    return true;
  };

  const recordHandleSubmit = async (data, event) => {
    console.log(" preDataSet: selectedPreDataLocal", selectedPreDataLocal);
    console.log(" preDataSet: selectedChemoDataLocal", selectedChemoDataLocal);
    console.log(
      " preDataSet: selectedTakeHomeDataLocal",
      selectedTakeHomeDataLocal
    );

    event.preventDefault();

    const userConfirmed = window.confirm(
      "Are you sure you wanna Create Master Record?"
    );
    if (!userConfirmed) {
      return;
    }

    if (validateSelections()) {
      console.log("set Data:", data);

      let OuterObj = {};

      const cancers = `${data.typeOfCancer}`;
      const regimen = `${data.typeOfRegimen}`;

      OuterObj[regimen] = {};
      OuterObj[regimen] = regimenType;

      OuterObj[cancers] = {};
      OuterObj[cancers][regimen] = regimenType;

      console.log("OuterObj:", OuterObj);

      setRegimenType({
        preDataSet: selectedPreDataLocal,
        chemoDataSet: selectedChemoDataLocal,
        takeHomeDataSet: selectedTakeHomeDataLocal,
      });

      console.log("regimenType: inside:", {
        preDataSet: selectedPreDataLocal,
        chemoDataSet: selectedChemoDataLocal,
        takeHomeDataSet: selectedTakeHomeDataLocal,
      });

      setCancerType(regimenType);

      const payload = {
        preRefIds: selectedPreDataLocal.map((data) => {
          return data._id;
        }),
        chemoRefIds: selectedChemoDataLocal.map((data) => {
          return data._id;
        }),
        takeHomeRefIds: selectedTakeHomeDataLocal.map((data) => {
          return data._id;
        }),
        cancerInputData: cancers,
        regimenInputData: regimen,
      };
      console.log("Payload:", payload);
      dispatch(createMasterRecord(payload));
      dispatch(getCancerList());
    }
  };

  const handleFormSubmit = handleSubmit((data, event) =>
    recordHandleSubmit(data, event)
  );

  useEffect(() => {
    if (message) {
      if (errMessage) {
        toast.error(message, {
          // delay: 1000,
          // hideProgressBar: true
        });
        setTimeout(() => {
          dispatch(clearMasterMessage());
        }, 0);
        return;
      }

      if (message.match("Regimen is already")) {
        toast.warn(message);
        setTimeout(() => {
          dispatch(clearMasterMessage());
        }, 0);
        return;
      }

      toast.success(message, {
        // delay: 1000,
        // hideProgressBar: true
      });
      setTimeout(() => {
        dispatch(clearMasterMessage());
      }, 0);
      reset();
      setSelectedPreDataLocal([]);
      setSelectedChemoDataLocal([]);
      setSelectedTakeHomeDataLocal([]);
    }
  }, [message, errMessage]);

  const handleBackBtn = () => {
    const userConfirmed = window.confirm(
      "You have unsaved changes. Are you sure you want to leave?"
    );
    if (!userConfirmed) {
      return;
    }
    setTimeout(() => {
      navigate(-1);
    }, [500]);
  };

  // *************** premedication Pagination start and function **********
  const [preDrugPerPage, setPreDrugPerPage] = useState(5);
  const [currentPrePage, setCurrentPrePage] = useState(1);
  const [searchPreData, setSearchPreData] = useState(""); // value

  const handlePremedicationPageChange = (event, newPage) => {
    setCurrentPrePage(newPage + 1);
  };

  const handlePremedicationPerRowsChange = (event) => {
    setPreDrugPerPage(+event.target.value);
    setCurrentPrePage(1);
  };

  const handleSearchChangePremedicaitonData = (event) => {
    setSearchPreData(event.target.value);
    setCurrentPrePage(1);
  };

  useEffect(() => {
    dispatch(
      getPremedicationDrug(currentPrePage, preDrugPerPage, searchPreData)
    );
  }, [currentPrePage, preDrugPerPage, searchPreData, dispatch]);

  const isPreRowDisabled = (row) => {
    const checkedStatus =
      selectedPreDataLocal &&
      selectedPreDataLocal.find((item) => row._id === item._id);
    return !!checkedStatus;
  };

  const [selected, setSelected] = useState([]);
  const [selectedAllRowData, setSelectedAllRowData] = useState([]);

  console.log("selected :", selected);
  console.log("selectedAllRowData :", selectedAllRowData);

  const handlePremedicationDataSelectRow = (row) => {
    const selectedIndex = selected.indexOf(row._id);
    let newSelected = [];
    let newSelectedAllRowData = [...selectedAllRowData];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row._id);
      newSelectedAllRowData.push(row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newSelectedAllRowData = newSelectedAllRowData.filter(
        (data) => data._id !== row._id
      );
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newSelectedAllRowData = newSelectedAllRowData.filter(
        (data) => data._id !== row._id
      );
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      newSelectedAllRowData = newSelectedAllRowData.filter(
        (data) => data._id !== row._id
      );
    }

    setSelected(newSelected);
    setSelectedAllRowData(newSelectedAllRowData);
  };

  const handlePremedicationDataClearSelection = () => {
    setSearchPreData('');
    setSelected([]);
    setSelectedAllRowData([]);
  };

  const isPremedicationDataSelected = (id) => selected.indexOf(id) !== -1;

  const handlePremedicationDataSubmit = (e) => {
    e.preventDefault();
    setSelectedPreDataLocal((prevData) => {
      // Combine previous data with selected rows
      const updatedData = [...prevData, ...selectedAllRowData];
      // Sort by drugName alphabetically
      const sortedData = updatedData.sort((a, b) => {
        if (a.drugName < b.drugName) return -1;
        if (a.drugName > b.drugName) return 1;
        return 0;
      });
      return sortedData;
    });
    handlePremedicationDataClearSelection();
  };

  const handleDeletePremeditionTreatmentRecords = async (id) => {
    const filterData = selectedPreDataLocal.filter((data) => data._id !== id);
    console.log("pre filterData:", filterData);
    setSelectedPreDataLocal([...filterData]);
  };

  // *************** premedication Pagination end **********

  // *************** Chemotherapy Pagination start **********
  const [chemoDrugPerPage, setChemoDrugPerPage] = useState(5);
  const [currentChemoPage, setCurrentChemoPage] = useState(1);
  const [searchChemoData, setSearchChemoData] = useState(""); // value

  const handleChemotherapyPageChange = (event, newPage) => {
    setCurrentChemoPage(newPage + 1);
  };

  const handleChemotherapyPerRowsChange = (event) => {
    setChemoDrugPerPage(+event.target.value); // per page
    setCurrentChemoPage(1);
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

  const isChemoRowDisabled = (row) => {
    const checkedStatus =
      selectedChemoDataLocal &&
      selectedChemoDataLocal.find((item) => row._id === item._id);
    return !!checkedStatus;
  };

  const [selectedChemoData, setSelectedChemoData] = useState([]);
  const [selectedAllRowChemoData, setSelectedAllRowChemoData] = useState([]);

  console.log("selectedChemoData :", selectedChemoData);
  console.log("selectedAllRowChemoData :", selectedAllRowChemoData);

  const handleChemotherapyDataSelectRow = (row) => {
    const selectedIndex = selectedChemoData.indexOf(row._id);
    let newSelectedChemoData = [];
    let newSelectedAllRowChemoData = [...selectedAllRowChemoData];

    if (selectedIndex === -1) {
      newSelectedChemoData = newSelectedChemoData.concat(
        selectedChemoData,
        row._id
      );
      newSelectedAllRowChemoData.push(row);
    } else if (selectedIndex === 0) {
      newSelectedChemoData = newSelectedChemoData.concat(
        selectedChemoData.slice(1)
      );
      newSelectedAllRowChemoData = newSelectedAllRowChemoData.filter(
        (data) => data._id !== row._id
      );
    } else if (selectedIndex === selectedChemoData.length - 1) {
      newSelectedChemoData = newSelectedChemoData.concat(
        selectedChemoData.slice(0, -1)
      );
      newSelectedAllRowChemoData = newSelectedAllRowChemoData.filter(
        (data) => data._id !== row._id
      );
    } else if (selectedIndex > 0) {
      newSelectedChemoData = newSelectedChemoData.concat(
        selectedChemoData.slice(0, selectedIndex),
        selectedChemoData.slice(selectedIndex + 1)
      );
      newSelectedAllRowChemoData = newSelectedAllRowChemoData.filter(
        (data) => data._id !== row._id
      );
    }

    setSelectedChemoData(newSelectedChemoData);
    setSelectedAllRowChemoData(newSelectedAllRowChemoData);
  };

  const handleChemotherapyDataClearSelection = () => {
    setSearchChemoData('');
    setSelectedChemoData([]);
    setSelectedAllRowChemoData([]);
  };

  const isChemotherapyDataSelected = (id) =>
    selectedChemoData.indexOf(id) !== -1;

  const handleChemotherapyDataSubmit = (e) => {
    e.preventDefault();
    setSelectedChemoDataLocal((prevData) => {
      const updatedData = [...prevData, ...selectedAllRowChemoData];
      const sortedData = updatedData.sort((a, b) => {
        if (a.drugName < b.drugName) return -1;
        if (a.drugName > b.drugName) return 1;
        return 0;
      });
      return sortedData;
    });
    handleChemotherapyDataClearSelection();
  };

  const handleDeleteChemotherapyTreatmentRecords = async (id) => {
    const filterData = selectedChemoDataLocal.filter((data) => data._id !== id);
    console.log("pre filterData:", filterData);
    setSelectedChemoDataLocal([...filterData]);
  };

  // *************** Chemotherapy Pagination end **********

  // *************** Take Home Pagination start **********
  const [takeHomeDrugPerPage, setTakeHomeDrugPerPage] = useState(5);
  const [currentTakeHomePage, setCurrentTakeHomePage] = useState(1);
  const [searchTakeHomeData, setSearchTakeHomeData] = useState(""); // value

  const handleTakeHomePageChange = (event, newPage) => {
    setCurrentTakeHomePage(newPage + 1);
  };

  const handleTakeHomePerRowsChange = (event) => {
    setTakeHomeDrugPerPage(+event.target.value);
    setCurrentTakeHomePage(1);
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

  const [selectedTakeHomeData, setSelectedTakeHomeData] = useState([]);
  const [selectedAllRowTakeHomeData, setSelectedAllRowTakeHomeData] = useState(
    []
  );

  console.log("selectedTakeHomeData :", selectedTakeHomeData);
  console.log("selectedAllRowTakeHomeData :", selectedAllRowTakeHomeData);

  const handleTakeHomeDataSelectRow = (row) => {
    const selectedIndex = selectedTakeHomeData.indexOf(row._id);
    let newSelectedTakeHomeData = [];
    let newSelectedAllRowTakeHomeData = [...selectedAllRowTakeHomeData];

    if (selectedIndex === -1) {
      newSelectedTakeHomeData = newSelectedTakeHomeData.concat(
        selectedTakeHomeData,
        row._id
      );
      newSelectedAllRowTakeHomeData.push(row);
    } else if (selectedIndex === 0) {
      newSelectedTakeHomeData = newSelectedTakeHomeData.concat(
        selectedTakeHomeData.slice(1)
      );
      newSelectedAllRowTakeHomeData = newSelectedAllRowTakeHomeData.filter(
        (data) => data._id !== row._id
      );
    } else if (selectedIndex === selectedTakeHomeData.length - 1) {
      newSelectedTakeHomeData = newSelectedTakeHomeData.concat(
        selectedTakeHomeData.slice(0, -1)
      );
      newSelectedAllRowTakeHomeData = newSelectedAllRowTakeHomeData.filter(
        (data) => data._id !== row._id
      );
    } else if (selectedIndex > 0) {
      newSelectedTakeHomeData = newSelectedTakeHomeData.concat(
        selectedTakeHomeData.slice(0, selectedIndex),
        selectedTakeHomeData.slice(selectedIndex + 1)
      );
      newSelectedAllRowTakeHomeData = newSelectedAllRowTakeHomeData.filter(
        (data) => data._id !== row._id
      );
    }

    setSelectedTakeHomeData(newSelectedTakeHomeData);
    setSelectedAllRowTakeHomeData(newSelectedAllRowTakeHomeData);
  };

  const isTakeHomeRowDisabled = (row) => {
    const checkedStatus =
      selectedTakeHomeDataLocal &&
      selectedTakeHomeDataLocal.find((item) => row._id === item._id);
    return !!checkedStatus;
  };

  const isTakeHomeDataSelected = (id) =>
    selectedTakeHomeData.indexOf(id) !== -1;

  const handleTakeHomeDataSubmit = (e) => {
    e.preventDefault();
    setSelectedTakeHomeDataLocal((prevData) => {
      const updatedData = [...prevData, ...selectedAllRowTakeHomeData];
      const sortedData = updatedData.sort((a, b) => {
        if (a.drugName < b.drugName) return -1;
        if (a.drugName > b.drugName) return 1;
        return 0;
      });
      return sortedData;
    });
    handleTakeHomeDataClearSelection();
  };

  const handleTakeHomeDataClearSelection = () => {
    setSearchTakeHomeData('');
    setSelectedTakeHomeData([]);
    setSelectedAllRowTakeHomeData([]);
  };

  const handleDeleteTakeHomeTreatmentRecords = async (id) => {
    const filterData = selectedTakeHomeDataLocal.filter(
      (data) => data._id !== id
    );
    setSelectedTakeHomeDataLocal([...filterData]);
  };

  // ***************  Take Home Pagination end **********

  return (
    <>
      {/* ========= ********** Main Funtion start form here ************ =============== */}

      <div className="container-fluid ">
        <div className="">
          <div className="my-4 border rounded-top">
            <div className="bg-info px-3 py-2 rounded-top">
              <div className="row d-flex  ">
                <div className="col-12">
                  <div className=" d-flex align-items-center justify-content-center">
                    <h3 className="m-0 text-white">Create Master Records</h3>
                  </div>
                </div>
              </div>
            </div>
            {/* <form onSubmit={handleFormSubmit}> */}
            {/* ========== Form field here ========== */}
            <div className="row mx-1 my-2">
              <div className="col-12">
                <form onSubmit={handleFormSubmit}>
                  <div className="form-row">
                    <div className="form-group col-sm-12 col-md-6 col-lg-3">
                      <label>Type Of Cancer</label>
                      <input
                        type="text"
                        className="form-control"
                        {...register("typeOfCancer")}
                        name="typeOfCancer"
                        list="cancerData"
                      />
                      <datalist id="cancerData">
                        {cancerList?.map((item, key) => (
                          <option key={key} value={item.name} />
                        ))}
                      </datalist>

                      {errors?.typeOfCancer && (
                        <p className="text-start text-danger">
                          {" "}
                          {errors.typeOfCancer?.message}{" "}
                        </p>
                      )}
                    </div>
                    <div className="form-group col-sm-12 col-md-6 col-lg-3">
                      <label>Type of Regimen</label>
                      <input
                        type="text"
                        className="form-control"
                        {...register("typeOfRegimen")}
                        name="typeOfRegimen"
                        list="regimenData"
                      />
                      <datalist id="regimenData">
                        {regimenList?.map((item, key) => (
                          <option key={key} value={item.name} />
                        ))}
                      </datalist>

                      {errors?.typeOfRegimen && (
                        <p className="text-start text-danger">
                          {" "}
                          {errors.typeOfRegimen?.message}{" "}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* </form> */}

                  {/* *************** Premedication Table start form here **************** */}

                  {preLoading == false ? (
                    <>
                      <div className="">
                        <div className=" my-2">
                          <div className="  bg-info px-3 py-2 rounded-top">
                            <div className="row d-flex  ">
                              <div className="col-md-6">
                                <div className=" d-flex align-items-center">
                                  <h3 className="m-0 text-white">
                                    Premedication Items
                                  </h3>
                                </div>
                              </div>
                              <div className="col-md-6 ">
                                <div className="d-flex align-items-center justify-content-end">
                                  <button
                                    className="btn btn-light py-2"
                                    data-toggle="modal"
                                    type="button"
                                    data-target="#PremedicationForms"
                                  >
                                    <PlusSquareFill className="d-flex align-items-center bg-primary-text " />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <DataTable
                            showGridlines
                            className="border"
                            columns={preColumns}
                            data={selectedPreDataLocal}
                            striped={true}
                            pagination
                            customStyles={customTableStyle}
                            selectableRowsHighlight
                            highlightOnHover
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Spinner />
                    </>
                  )}

                  {/* *************** Chemotherapy Table start form here **************** */}

                  {chemoLoading == false ? (
                    <>
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
                                <div className="d-flex align-items-center justify-content-end">
                                  <button
                                    className="btn btn-light py-2"
                                    data-toggle="modal"
                                    type="button"
                                    data-target="#ChemotherapyForms"
                                  >
                                    <PlusSquareFill className="d-flex align-items-center bg-primary-text " />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <DataTable
                            showGridlines
                            className="border"
                            columns={chemoColumns}
                            data={selectedChemoDataLocal}
                            striped={true}
                            pagination
                            customStyles={customTableStyle}
                            selectableRowsHighlight
                            highlightOnHover
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Spinner />
                    </>
                  )}

                  {/* *************** Take Home Table start form here **************** */}

                  {takehomeLoading == false ? (
                    <>
                      <div className=" container-fluid my-3 p-0 ">
                        <div className=" my-2">
                          <div className="  bg-info px-3 py-2 rounded-top">
                            <div className="row d-flex  ">
                              <div className="col-md-6">
                                <div className=" d-flex align-items-center">
                                  <h3 className="m-0 text-white">
                                    Take Home Medicine
                                  </h3>
                                </div>
                              </div>
                              <div className="col-md-6 ">
                                <div className="d-flex align-items-center justify-content-end">
                                  <button
                                    className="btn btn-light py-2"
                                    data-toggle="modal"
                                    type="button"
                                    data-target="#TakeHomeForms"
                                  >
                                    <PlusSquareFill className="d-flex align-items-center bg-primary-text " />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <DataTable
                            showGridlines
                            className="border"
                            columns={takeHomeColumns}
                            data={selectedTakeHomeDataLocal}
                            striped={true}
                            pagination
                            customStyles={customTableStyle}
                            selectableRowsHighlight
                            highlightOnHover
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Spinner />
                    </>
                  )}

                  <div className="d-flex justify-content-between ">
                    <div className="">
                      <button
                        type="button"
                        className="btn btn-info bg-info px-5"
                        onClick={handleBackBtn}
                      >
                        Back
                      </button>
                    </div>

                    <div className="">
                      <button
                        type="submit"
                        className="btn btn-info bg-info px-5"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>

      {/* *************************************  Page End  ******************************************************* */}

      {/* ===================================== Modal for All Start ====================================== */}
      {/* ************* Premedication Add Drug List Modal start *********** */}
      <div
        className="modal fade"
        id="PremedicationForms"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        {/* {!closeModal && */}
        <div className="modal-dialog modal-xl  modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {/* Premedication Add drug  */}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"

                onClick={handlePremedicationDataClearSelection}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid p-0">
                <div className="mx-3">
                  <div
                    className="row py-1 align-items-center "
                    style={{
                      backgroundColor: "#8ddee5",
                      borderRadius: "5px 5px  0 0 ",
                    }}
                  >
                    <div className="col-sm-12 col-md-6 my-1">
                      <p className="h4 m-0 text text-center text-md-left">
                        Premedication (Additional Drug)
                      </p>
                    </div>
                    <div className="col-sm-12 col-md-6 my-1 d-flex justify-content-end">
                      <input
                        className="form-control col-md-10 col-xl-4   mr-sm-2"
                        type="search"
                        placeholder="Search"
                        value={searchPreData}
                        aria-label="Search"
                        onChange={handleSearchChangePremedicaitonData}
                      />
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="container-fluid px-0">
                    <Paper className="shadow-none">
                      <TableContainer>
                        <Table className="border">
                          <TableHead>
                            <TableRow style={{ backgroundColor: "#c1e6e9" }}>
                              <TableCell padding="checkbox">
                                <Checkbox
                                  disabled
                                  indeterminate={
                                    selected.length > 0 &&
                                    selected.length < preData.length
                                  }
                                  checked={
                                    preData.length > 0 &&
                                    selected.length === preData.length
                                  }
                                  onChange={(event) =>
                                    setSelected(
                                      event.target.checked
                                        ? preData.map((row) => row._id)
                                        : []
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell>Drug Type/Name</TableCell>
                              <TableCell>Brand Name</TableCell>
                              <TableCell>Dose</TableCell>
                              <TableCell>Unit</TableCell>
                              <TableCell>Duration</TableCell>
                              <TableCell>Frequency</TableCell>
                              <TableCell>Administraion Details</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {preData && preData.length > 0 ? (
                              preData.map((row) => {
                                const isItemSelected =
                                  isPremedicationDataSelected(row._id);
                                const isDisabled = isPreRowDisabled(row);

                                return (
                                  <TableRow
                                    key={row._id}
                                    hover={!isDisabled}
                                    // onClick={() =>
                                    //   !isDisabled &&
                                    //   handlePremedicationDataSelectRow(row)
                                    // }
                                    // role="checkbox"
                                    aria-checked={isItemSelected}
                                    selected={isItemSelected}
                                  >
                                    <TableCell padding="checkbox">
                                      <Checkbox
                                        checked={isItemSelected}
                                        disabled={isDisabled}
                                        onClick={(event) => {
                                          // Prevent the click event from bubbling up to the row
                                          event.stopPropagation();
                                          handlePremedicationDataSelectRow(row);
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell>{`${row.drugType}. ${row.drugName}`}</TableCell>
                                    <TableCell>{row.brandName}</TableCell>
                                    <TableCell>{row.doseValue}</TableCell>
                                    <TableCell>{row.unit}</TableCell>
                                    <TableCell>{row.duration} {row.duration == 1 ? "day" : "days"}  </TableCell>
                                    <TableCell>
                                      {row.frequency[0]} - {row.frequency[1]} -{" "}
                                      {row.frequency[2]}
                                    </TableCell>
                                    <TableCell>{row.details}</TableCell>
                                  </TableRow>
                                );
                              })
                            ) : (
                              <TableRow>
                                <TableCell
                                  colSpan={8}
                                  align="center"
                                  className="text-danger"
                                >
                                  Records Not Found
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      {/* Wrap the pagination with a Box to add selected row count on the left */}
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        className="px-2"
                      >
                        <Typography variant="subtitle1">
                          {selected.length > 0
                            ? `${selected.length} row(s) selected`
                            : "No rows selected"}
                        </Typography>
                        <TablePagination
                          component="div"
                          count={preDrugsCount}
                          page={currentPrePage - 1}
                          onPageChange={handlePremedicationPageChange}
                          rowsPerPage={preDrugPerPage}
                          rowsPerPageOptions={[]}
                          onRowsPerPageChange={handlePremedicationPerRowsChange}
                          labelDisplayedRows={({ from, to, count }) =>
                            `${from} - ${to} of ${count}`
                          }
                          sx={{
                            "& .MuiTablePagination-actions": { margin: 0 },
                            "& .MuiTablePagination-displayedRows": {
                              margin: 0,
                            },
                            "& .MuiTablePagination-root": { padding: 0 },
                            "& .MuiTablePagination-selectLabel": {
                              margin: 0,
                            },
                          }}
                        />
                      </Box>
                    </Paper>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer justify-content-between">
              <div className="">
                <button
                  data-toggle="modal"
                  type="button"
                  data-target="#PremedicationForm"
                  className="btn btn-primary"
                >
                  Add Extra Drug
                </button>
              </div>
              <div className="">
                {selected.length > 0 && (
                  <button
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick={(e) => handlePremedicationDataSubmit(e)}
                    data-dismiss={!btns ? "modal" : null}
                  >
                    Submit
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-secondary mr-2"
                  disabled={selected.length > 0 ? false : true}
                  onClick={handlePremedicationDataClearSelection}
                >
                  Clear
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss={!btns ? "modal" : null}
                  onClick={handlePremedicationDataClearSelection}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ************* Premedication Add Drug List Modal End *********** */}

      {/* ************* Chemotherapy Add Drug Modal start *********** */}
      <div
        className="modal fade"
        id="ChemotherapyForms"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl  modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {/* Chemotherapy Add drug */}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleChemotherapyDataClearSelection}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid p-0">
                <div className="mx-3">
                  <div
                    className="row py-1 align-items-center "
                    style={{
                      backgroundColor: "#8ddee5",
                      borderRadius: "5px 5px  0 0 ",
                    }}
                  >
                    <div className="col-sm-12 col-md-6 my-1">
                      <p className="h4 m-0 text text-center text-md-left">
                        Chemotherapy (Additional Drug)
                      </p>
                    </div>
                    <div className="col-sm-12 col-md-6 my-1 d-flex justify-content-end">
                      <input
                        className="form-control col-md-10 col-xl-4   mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={searchChemoData}
                        onChange={handleSearchChangeChemotherapyData}
                      />
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="container-fluid px-0">
                    <Paper className="shadow-none">
                      <TableContainer>
                        <Table className="border">
                          <TableHead>
                            <TableRow style={{ backgroundColor: "#c1e6e9" }}>
                              <TableCell padding="checkbox">
                                <Checkbox
                                  disabled
                                  indeterminate={
                                    selectedChemoData.length > 0 &&
                                    selectedChemoData.length < chemoData.length
                                  }
                                  checked={
                                    chemoData.length > 0 &&
                                    selectedChemoData.length ===
                                    chemoData.length
                                  }
                                  onChange={(event) =>
                                    setSelectedChemoData(
                                      event.target.checked
                                        ? chemoData.map((row) => row._id)
                                        : []
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell>Drug Name</TableCell>
                              <TableCell>Brand Name</TableCell>
                              <TableCell>Dose Range</TableCell>
                              <TableCell>Dose Pct(%)</TableCell>
                              <TableCell>Route</TableCell>
                              <TableCell>Duration</TableCell>
                              <TableCell>Dilution Volume</TableCell>
                              <TableCell>Administraion Details</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {chemoData && chemoData.length > 0 ? (
                              chemoData.map((row) => {
                                const isChemoItemSelected =
                                  isChemotherapyDataSelected(row._id);
                                const isChemoDisabled = isChemoRowDisabled(row);

                                return (
                                  <TableRow
                                    key={row._id}
                                    hover={!isChemoDisabled}
                                    // onClick={() =>
                                    //   !isChemoDisabled &&
                                    //   handleChemotherapyDataSelectRow(row)
                                    // }
                                    role="checkbox"
                                    aria-checked={isChemoItemSelected}
                                    selected={isChemoItemSelected}
                                  >
                                    <TableCell padding="checkbox">
                                      <Checkbox
                                        checked={isChemoItemSelected}
                                        disabled={isChemoDisabled}
                                        onClick={(event) => {
                                          // Prevent the click event from bubbling up to the row
                                          event.stopPropagation();
                                          handleChemotherapyDataSelectRow(row);
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell>{`${row.drugType}. ${row.drugName}`}</TableCell>
                                    <TableCell>{row.brandName}</TableCell>
                                    <TableCell>{`${row.doseRangeA} - ${row.doseRangeB} ${row.doseUnit}`}</TableCell>
                                    <TableCell>{row.dosePct}%</TableCell>
                                    <TableCell>{row.route}</TableCell>
                                    <TableCell>
                                      {row.duration}{" "}
                                      {row.duration == 1 ? "hrs" : "hrs"}
                                    </TableCell>
                                    <TableCell>{row.dilution} ml</TableCell>
                                    <TableCell>{row.details}</TableCell>
                                  </TableRow>
                                );
                              })
                            ) : (
                              <TableRow>
                                <TableCell
                                  colSpan={8}
                                  align="center"
                                  className="text-danger"
                                >
                                  Records Not Found
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      {/* Wrap the pagination with a Box to add selected row count on the left */}
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        className="px-2"
                      >
                        <Typography variant="subtitle1">
                          {selectedChemoData.length > 0
                            ? `${selectedChemoData.length} row(s) selected`
                            : "No rows selected"}
                        </Typography>
                        <TablePagination
                          component="div"
                          count={chemoDrugsCount}
                          page={currentChemoPage - 1}
                          onPageChange={handleChemotherapyPageChange}
                          rowsPerPage={chemoDrugPerPage}
                          rowsPerPageOptions={[]}
                          onRowsPerPageChange={handleChemotherapyPerRowsChange}
                          labelDisplayedRows={({ from, to, count }) =>
                            `${from} - ${to} of ${count}`
                          }
                          sx={{
                            "& .MuiTablePagination-actions": { margin: 0 },
                            "& .MuiTablePagination-displayedRows": {
                              margin: 0,
                            },
                            "& .MuiTablePagination-root": { padding: 0 },
                            "& .MuiTablePagination-selectLabel": {
                              margin: 0,
                            },
                          }}
                        />
                      </Box>
                    </Paper>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer justify-content-between">
              <div className="">
                <button
                  data-toggle="modal"
                  type="button"
                  data-target="#ChemotherapyForm"
                  className="btn btn-primary"
                >
                  Add Extra Drug
                </button>
              </div>

              <div className="">
                {selectedChemoData.length > 0 && (
                  <button
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick={(e) => handleChemotherapyDataSubmit(e)}
                    data-dismiss={!btns ? "modal" : null}
                  >
                    Submit
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-secondary mr-2"
                  disabled={selectedChemoData.length > 0 ? false : true}
                  onClick={handleChemotherapyDataClearSelection}
                >
                  Clear
                </button>

                <button
                  type="button"
                  className="btn btn-danger "
                  data-dismiss={!btns ? "modal" : null}
                  onClick={handleChemotherapyDataClearSelection}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ************* Chemotherapy Add Drug Modal end *********** */}

      {/* ************* Take Home Add Drug Modal start *********** */}
      <div
        className="modal fade"
        id="TakeHomeForms"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl  modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {/* Take Home Add drug */}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleTakeHomeDataClearSelection}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid p-0">
                <div className="mx-3">
                  <div
                    className="row py-1 align-items-center "
                    style={{
                      backgroundColor: "#8ddee5",
                      borderRadius: "5px 5px  0 0 ",
                    }}
                  >
                    <div className="col-sm-12 col-md-6 my-1">
                      <p className="h4 m-0 text text-center text-md-left">
                        Take Home (Additional Drug)
                      </p>
                    </div>
                    <div className="col-sm-12 col-md-6 my-1 d-flex justify-content-end">
                      <input
                        className="form-control col-md-10 col-xl-4   mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={searchTakeHomeData}
                        onChange={handleSearchChangeTakeHomeData}
                      />
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="container-fluid px-0">
                    <Paper className="shadow-none">
                      <TableContainer>
                        <Table className="border">
                          <TableHead>
                            <TableRow style={{ backgroundColor: "#c1e6e9" }}>
                              <TableCell padding="checkbox">
                                <Checkbox
                                  disabled
                                  indeterminate={
                                    selectedTakeHomeData.length > 0 &&
                                    selectedTakeHomeData.length <
                                    takeHomeData.length
                                  }
                                  checked={
                                    takeHomeData.length > 0 &&
                                    selectedTakeHomeData.length ===
                                    takeHomeData.length
                                  }
                                  onChange={(event) =>
                                    setSelectedTakeHomeData(
                                      event.target.checked
                                        ? takeHomeData.map((row) => row._id)
                                        : []
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell>Drug Type/Name</TableCell>
                              <TableCell>Brand Name</TableCell>
                              <TableCell>Dose / Unit</TableCell>
                              <TableCell>Duration</TableCell>
                              <TableCell>Frequency</TableCell>
                              <TableCell>Administraion Details</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {takeHomeData && takeHomeData.length > 0 ? (
                              takeHomeData.map((row) => {
                                const isTakeHomeItemSelected =
                                  isTakeHomeDataSelected(row._id);
                                const isTakeHomeDisabled =
                                  isTakeHomeRowDisabled(row);

                                return (
                                  <TableRow
                                    key={row._id}
                                    hover={!isTakeHomeDisabled}
                                    // onClick={() =>
                                    //   !isTakeHomeDisabled &&
                                    //   handleTakeHomeDataSelectRow(row)
                                    // }
                                    // role="checkbox"
                                    aria-checked={isTakeHomeItemSelected}
                                    selected={isTakeHomeItemSelected}
                                  >
                                    <TableCell padding="checkbox">
                                      <Checkbox
                                        checked={isTakeHomeItemSelected}
                                        disabled={isTakeHomeDisabled}
                                        onClick={(event) => {
                                          // Prevent the click event from bubbling up to the row
                                          event.stopPropagation();
                                          handleTakeHomeDataSelectRow(row);
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell>{`${row.drugType}. ${row.drugName}`}</TableCell>
                                    <TableCell>{row.brandName}</TableCell>
                                    <TableCell>
                                      {row.doseValue} {row.unit}{" "}
                                    </TableCell>
                                    <TableCell>
                                      {row.duration}{" "}
                                      {row.duration == 1 ? "day" : "days"}
                                    </TableCell>
                                    <TableCell>
                                      {row.frequency[0]} - {row.frequency[1]} -{" "}
                                      {row.frequency[2]}
                                    </TableCell>
                                    <TableCell>{row.details}</TableCell>
                                  </TableRow>
                                );
                              })
                            ) : (
                              <TableRow>
                                <TableCell
                                  colSpan={8}
                                  align="center"
                                  className="text-danger"
                                >
                                  Records Not Found
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      {/* Wrap the pagination with a Box to add selected row count on the left */}
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        className="px-2"
                      >
                        <Typography variant="subtitle1">
                          {selectedTakeHomeData.length > 0
                            ? `${selectedTakeHomeData.length} row(s) selected`
                            : "No rows selected"}
                        </Typography>
                        <TablePagination
                          component="div"
                          count={takeHomeDrugsCount}
                          page={currentTakeHomePage - 1}
                          onPageChange={handleTakeHomePageChange}
                          rowsPerPage={takeHomeDrugPerPage}
                          rowsPerPageOptions={[]}
                          onRowsPerPageChange={handleTakeHomePerRowsChange}
                          labelDisplayedRows={({ from, to, count }) =>
                            `${from} - ${to} of ${count}`
                          }
                          sx={{
                            "& .MuiTablePagination-actions": { margin: 0 },
                            "& .MuiTablePagination-displayedRows": {
                              margin: 0,
                            },
                            "& .MuiTablePagination-root": { padding: 0 },
                            "& .MuiTablePagination-selectLabel": { margin: 0 },
                          }}
                        />
                      </Box>
                    </Paper>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer justify-content-between">
              <div className="">
                <button
                  data-toggle="modal"
                  type="button"
                  data-target="#TakeHomeMedicationForm"
                  className="btn btn-primary"
                >
                  Add Extra Drug
                </button>
              </div>

              <div className="">
                {selectedTakeHomeData.length > 0 && (
                  <button
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick={(e) => handleTakeHomeDataSubmit(e)}
                    data-dismiss={!btns ? "modal" : null}
                  >
                    Submit
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-secondary mr-2 "
                  disabled={selectedTakeHomeData.length > 0 ? false : true}
                  onClick={handleTakeHomeDataClearSelection}
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss={!btns ? "modal" : null}
                  onClick={handleTakeHomeDataClearSelection}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ************* Take Home Add Drug Modal end *********** */}

      {/* ===================================== Modal for All End ====================================== */}

      <PremedicationInsertForm />

      <ChemoInsertForm />

      <TakeHomeInsertForm />
    </>
  );
};

export default CreateMasterRecord;
