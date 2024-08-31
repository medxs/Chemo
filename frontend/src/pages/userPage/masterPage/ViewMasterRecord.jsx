import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSingleChemotharapyRecordIntoMasterRecord,
  addSinglePremedicationRecordIntoMasterRecord,
  addSingleTakeHomeRecordIntoMasterRecord,
  clearDataInMasterList,
  deleteSingleChemotherapyRecordFromMasterRecord,
  deleteSinglePremedicationRecordFromMasterRecord,
  deleteSingleTakeHomeRecordFromMasterRecord,
  getCancerList,
  getChemoRecord,
  getPremediRecord,
  getRegimenList,
  getTakeHomeRecord,
} from "../../../redux/actions/masterRecordAction";
import DataTable from "react-data-table-component";
import { PlusSquareFill, Trash3Fill } from "react-bootstrap-icons";
import {
  getChemoDrug,
  getChemotherapyDrugs,
  getPremedicationDrug,
  getTakeHomeDrug,
  getTakeHomeDrugs,
} from "../../../redux/actions/drugAction";
import { toast } from "react-toastify";
import { premedicationClearMessages } from "../../../redux/slices/preDrugSlice";
import { chemoClearMessages } from "../../../redux/slices/chemoDrugSlice";
import { takeHomeClearMessages } from "../../../redux/slices/takeHomeDrugSlice";
import { useLocation, useNavigate } from "react-router-dom";
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
import { clearPremedicationDataMasterList } from "../../../redux/slices/master-record-slices/getPreMedicationMasterListSlice";
import { clearTakeHomeDataMasterList } from "../../../redux/slices/master-record-slices/getTakeHomeMasterListSlice";
import { clearChemotherapyDataMasterList } from "../../../redux/slices/master-record-slices/getChemotherapyMasterListSlice";
import {
  ChemoInsertForm,
  PremedicationInsertForm,
  TakeHomeInsertForm,
} from "../../../components/doctorComponents/AllForm";

const ViewMasterRecord = () => {
  const [btns, setBtns] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ********************* model function start ************************

  //connect to store , fetct premedication data from Database
  const {
    preDrugsCount,
    preDrugs,
    isLoading: preLoading,
  } = useSelector((state) => state?.preDrugData);
  // //connect to store , fetct chemo data from Database
  const {
    chemoDrugs,
    chemoDrugsCount,
    isLoading: chemoLoading,
  } = useSelector((state) => state?.chemoDrugData);

  // //connect to store , fetct takehome data from Database
  const {
    takeHomeDrugsCount,
    takeHomeDrugs,
    isLoading: takehomeLoading,
  } = useSelector((state) => state?.takeHomeDrugData);
  // assing to variable
  const premedicationDataStore = preDrugs;
  const chemotherapyDataStore = chemoDrugs;
  const takeHomesDataStore = takeHomeDrugs;

  console.log("premedicationDataStore:", premedicationDataStore);
  console.log("chemotherapyDataStore:", chemotherapyDataStore);
  console.log("takeHomesDataStore:", takeHomesDataStore);

  console.log("preDrugsCount", preDrugsCount);

  const [preData, setPreData] = useState(premedicationDataStore);
  const [chemoData, setChemoData] = useState(chemotherapyDataStore);
  const [takeHomeMediData, setTakeHomeMediData] = useState(takeHomesDataStore);

  console.log("preData:", preData);
  console.log("chemoData:", chemoData);
  console.log("takeHomeMediData:", takeHomeMediData);

  useEffect(() => {
    setPreData(premedicationDataStore);
    setChemoData(chemotherapyDataStore);
    setTakeHomeMediData(takeHomesDataStore);
  }, [premedicationDataStore, chemotherapyDataStore, takeHomesDataStore]);

  // ===================== Premedication Table Data ====================================

  const {
    isPreAddSuccessMsg,
    isPreAddErrorMsg,
    isPreDeleteSuccessMsg,
    isPreDeleteErrorMsg,
  } = useSelector((state) => state?.preDrugData);

  // ===================== Chemotherapy Table Data ====================================

  const {
    isChemoAddSuccessMsg,
    isChemoAddErrorMsg,
    isChemoDeleteSuccessMsg,
    isChemoDeleteErrorMsg,
  } = useSelector((state) => state?.chemoDrugData);

  // ===================== Take Home Table Data ====================================

  const {
    isTakeHomeDeleteSuccessMsg,
    isTakeHomeDeleteErrorMsg,
    isTakeHomeAddSuccessMsg,
    isTakeHomeAddErrorMsg,
  } = useSelector((state) => state?.takeHomeDrugData);

  // ********************* model function End ************************
  const { cancerList } = useSelector((state) => state.cancerDataState);
  const { regimenList } = useSelector((state) => state.regimenDataState);
  const { preMedicationData } = useSelector(
    (state) => state.premedicationDataState
  );
  const { chemotherapyData } = useSelector(
    (state) => state.chemotherapyDataState
  );
  const { takeHomeData } = useSelector((state) => state.takeHomeDataState);

  const [cancerDataId, setCancerDataId] = useState("");
  const [regimenDataId, setRegimenDataId] = useState("");

  // library Data records
  const [preTableData, setPreTableData] = useState(preMedicationData);
  const [chemoTableData, setChemoTableData] = useState(chemotherapyData);
  const [takeHomeTableData, setTakeHomeTableData] = useState(takeHomeData);

  const handleCancerList = (e) => {
    setCancerDataId(e.target.value);
    const payload = {
      cancerId: e.target.value,
    };
    // setRegimenType('');
    setRegimenDataId("");
    dispatch(getRegimenList(payload));
    clearTable();
  };

  useEffect(() => {
    dispatch(clearPremedicationDataMasterList());
    dispatch(clearChemotherapyDataMasterList());
    dispatch(clearTakeHomeDataMasterList());
  }, []);

  const payload = {
    cancerId: cancerDataId,
    regimenId: regimenDataId,
  };

  const handleGetRecords = () => {
    const payload = {
      cancerId: cancerDataId,
      regimenId: regimenDataId,
    };
    dispatch(getPremediRecord(payload));
    dispatch(getChemoRecord(payload));
    dispatch(getTakeHomeRecord(payload));
    setBtnDisable(true);
  };

  const clearTable = () => {
    setPreTableData([]);
    setChemoTableData([]);
    setTakeHomeTableData([]);
    setRegimenDataId("");
  };

  useEffect(() => {
    setPreTableData(preMedicationData);
    setChemoTableData(chemotherapyData);
    setTakeHomeTableData(takeHomeData);
  }, [preMedicationData, chemotherapyData, takeHomeData]);

  // useEffect(() => {
  //   dispatch(getCancerList());
  //   dispatch(getPremedicationDrug());
  //   dispatch(getChemotherapyDrugs());
  //   dispatch(getTakeHomeDrugs());
  // }, [dispatch]);

  // ************************* Delete function start ***************

  // pre drug record delete
  const handleDeletePremeditionDrugRecordInMasterRecord = (id) => {
    if (window.confirm(`Are you sure wanna Add into Premedication Record?`)) {
      const preRefId = id;

      // Dispatch the delete action and wait for it to complete
      dispatch(
        deleteSinglePremedicationRecordFromMasterRecord(
          cancerDataId,
          regimenDataId,
          preRefId
        )
      );
    }
  };

  // chemo drug record delete
  const handleDeleteChemotherapyDrugRecordInMasterRecord = (id) => {
    if (window.confirm(`Are you sure wanna Add into Chemotherapy Record?`)) {
      const chemoRefId = id;

      // Dispatch the delete action and wait for it to complete
      dispatch(
        deleteSingleChemotherapyRecordFromMasterRecord(
          cancerDataId,
          regimenDataId,
          chemoRefId
        )
      );
    }
  };

  // take home drug record delete
  const handleDeleteTakeHomeDrugRecordInMasterRecord = (id) => {
    if (window.confirm(`Are you sure wanna Add into Take Home Record?`)) {
      const takeHomeRefId = id;
      // Dispatch the delete action and wait for it to complete
      dispatch(
        deleteSingleTakeHomeRecordFromMasterRecord(
          cancerDataId,
          regimenDataId,
          takeHomeRefId
        )
      );
    }
  };

  // ************************* Delete function start ***************

  // ------------- toast message here start ----------------
  useEffect(() => {
    // pre delete msg
    if (isPreDeleteSuccessMsg) {
      if (isPreDeleteErrorMsg) {
        toast.error(isPreDeleteErrorMsg, {
          // delay: 1000,
          // hideProgressBar: true
        });
        setTimeout(() => {
          // dispatch(getPremediRecord(payload));
          dispatch(premedicationClearMessages());
        }, 100);
        return;
      }
      toast.success(isPreDeleteSuccessMsg, {
        // delay: 1000,
        // hideProgressBar: true
      });
      setTimeout(() => {
        dispatch(getPremediRecord(payload));
        dispatch(premedicationClearMessages());
      }, 100);
    }

    // pre add msg
    if (isPreAddSuccessMsg) {
      if (isPreAddErrorMsg) {
        toast.error(isPreAddErrorMsg);
        setTimeout(() => {
          dispatch(premedicationClearMessages());
        }, 100);
        return;
      }

      toast.success(isPreAddSuccessMsg);
      setTimeout(() => {
        dispatch(premedicationClearMessages());
        dispatch(getPremediRecord(payload));
      }, 100);
    }
  }, [
    isPreDeleteSuccessMsg,
    isPreDeleteErrorMsg,
    isPreAddSuccessMsg,
    isPreAddErrorMsg,
  ]);

  useEffect(() => {
    // chemo add msg
    if (isChemoAddSuccessMsg) {
      if (isChemoAddErrorMsg) {
        toast.error(isChemoAddErrorMsg);
        setTimeout(() => {
          dispatch(chemoClearMessages());
        }, 100);
        return;
      }
      toast.success(isChemoAddSuccessMsg);
      setTimeout(() => {
        dispatch(getChemoRecord(payload));
        dispatch(chemoClearMessages());
      }, 100);
    }

    // chemo delete msg
    if (isChemoDeleteSuccessMsg) {
      if (isChemoDeleteErrorMsg) {
        toast.error(isChemoDeleteErrorMsg, {
          // delay: 1000,
          // hideProgressBar: true
        });
        setTimeout(() => {
          dispatch(getChemoRecord(payload));
          dispatch(chemoClearMessages());
        }, 100);
        return;
      }
      toast.success(isChemoDeleteSuccessMsg, {
        // delay: 1000,
        // hideProgressBar: true
      });
      setTimeout(() => {
        dispatch(getChemoRecord(payload));
        dispatch(chemoClearMessages());
      }, 100);
    }
  }, [
    isChemoAddSuccessMsg,
    isChemoAddErrorMsg,
    isChemoDeleteSuccessMsg,
    isChemoDeleteErrorMsg,
  ]);

  useEffect(() => {
    // take home delete msg
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
        dispatch(getTakeHomeRecord(payload));
      }, 100);
    }

    // take home add msg
    if (isTakeHomeAddSuccessMsg) {
      if (isTakeHomeAddErrorMsg) {
        toast.error(isTakeHomeAddErrorMsg);
        setTimeout(() => {
          dispatch(takeHomeClearMessages());
        }, 100);
        return;
      }

      toast.success(isTakeHomeAddSuccessMsg);
      setTimeout(() => {
        dispatch(getTakeHomeRecord(payload));
        dispatch(takeHomeClearMessages());
      }, 100);
    }
  }, [
    ,
    isTakeHomeAddSuccessMsg,
    isTakeHomeAddErrorMsg,
    isTakeHomeDeleteSuccessMsg,
    isTakeHomeDeleteErrorMsg,
  ]);

  // ------------- toast message here end  ----------------

  // data come from library
  // const preColumns = [
  //   {
  //     name: "Drug Type/Name",
  //     selector: (row) => `${row.drugType}. ${row.drugName}`,
  //     sortable: true,
  //     grow: 1.7,
  //   },
  //   {
  //     name: "Brand",
  //     selector: (row) => row.brandName,
  //     sortable: true,
  //   },
  //   {
  //     name: "Dose",
  //     selector: (row) => row.doseValue,
  //     grow: 0.3,
  //   },
  //   {
  //     name: "Unit",
  //     selector: (row) => row.unit,
  //     grow: 0.3,
  //   },
  //   {
  //     name: "Duration",
  //     selector: (row) => {
  //       const days = row.duration;
  //       return `${days} ${days === 1 ? "day" : "days"}`;
  //     },
  //     grow: 0.5,
  //   },
  //   {
  //     name: "Frequency",
  //     selector: (row) =>
  //       `${row.frequency[0]} - ${row.frequency[1]} - ${row.frequency[2]}`,
  //     grow: 0.5,
  //   },
  //   {
  //     name: "Administraion Details",
  //     selector: (row) => row.details,
  //     grow: 1.5,
  //   },
  // ];

  // const chemoColumns = [
  //   {
  //     name: "Drug Name",
  //     selector: (row) => `${row.drugType}. ${row.drugName}`,
  //     grow: 1.7,
  //   },
  //   {
  //     name: "Brand Name",
  //     selector: (row) => `${row.brandName}`,
  //   },
  //   {
  //     name: "Dose Range",
  //     selector: (row) =>
  //       `${row.doseRangeA} - ${row.doseRangeB} ${row.doseUnit}`,
  //     // grow: .,
  //   },
  //   {
  //     name: "Dose Pct",
  //     selector: (row) => `${row.dosePct} %`,
  //     grow: 0.5,
  //   },
  //   {
  //     name: "Route",
  //     selector: (row) => row.route,
  //     grow: 0.2,
  //   },
  //   {
  //     name: "Duration",
  //     selector: (row) => `${row.duration} hrs`,
  //     grow: 0.4,
  //   },
  //   {
  //     name: "Dilution Volume",
  //     selector: (row) => `${row.dilution} ml`,
  //     grow: 0.5,
  //   },
  //   {
  //     name: "Administraion Details",
  //     selector: (row) => row.details,
  //     grow: 1.5,
  //   },
  // ];

  // const takeHomeColumns = [
  //   {
  //     name: "Drug Name",
  //     selector: (row) => `${row.drugType}. ${row.drugName}`,
  //     sortable: true,
  //     grow: 1.7,
  //   },
  //   {
  //     name: "Brand",
  //     selector: (row) => row.brandName,
  //     sortable: true,
  //   },
  //   {
  //     name: "Dose",
  //     selector: (row) => row.doseValue,
  //     grow: 0.3,
  //   },
  //   {
  //     name: "Unit",
  //     selector: (row) => row.unit,
  //     grow: 0.3,
  //   },
  //   {
  //     name: "Duration (days)",
  //     selector: (row) => `${row.duration} days`,
  //     grow: 0.5,
  //   },
  //   {
  //     name: "Frequency",
  //     selector: (row) =>
  //       `${row.frequency[0]} - ${row.frequency[1]} - ${row.frequency[2]}`,
  //     grow: 0.5,
  //   },
  //   {
  //     name: "Administraion Details",
  //     selector: (row) => row.details,
  //     grow: 1.5,
  //   },
  // ];

  const preDataColumns = [
    {
      name: "Drug Type/Name",
      selector: (row) => `${row.drugType}. ${row.drugName}`,
      sortable: true,
      grow: 1.7,
    },
    {
      name: "Brand",
      selector: (row) => row.brandName,
      sortable: true,
    },
    {
      name: "Dose",
      selector: (row) => row.doseValue,
      grow: 0.5,
    },
    {
      name: "Unit",
      selector: (row) => row.unit,
      grow: 0.5,
    },
    {
      name: "Duration (days)",
      selector: (row) => {
        const days = row.duration;
        return `${days} ${days === 1 ? "day" : "days"}`;
      },
      grow: 0.9,
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
            onClick={() =>
              handleDeletePremeditionDrugRecordInMasterRecord(item._id)
            }
          >
            <Trash3Fill />
          </button>
        </div>
      ),
      grow: 0.8,
    },
  ];

  const chemoDataColumns = [
    {
      name: "Drug Name",
      selector: (row) => `${row.drugType}. ${row.drugName}`,
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
      grow: 0.8,
    },
    {
      name: "Dose pct.(%)",
      selector: (row) => `${row.dosePct} %`,
      grow: 0.5,
    },
    {
      name: "Route",
      selector: (row) => row.route,
      grow: 0.3,
    },
    {
      name: "Duration",
      selector: (row) => `${row.duration} hrs`,
      grow: 0.5,
    },
    {
      name: "Dilution Volume",
      selector: (row) => `${row.dilution} ml`,
      grow: 0.5,
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
            onClick={() =>
              handleDeleteChemotherapyDrugRecordInMasterRecord(item._id)
            }
          >
            <Trash3Fill />
          </button>
        </div>
      ),
      grow: 0.5,
    },
  ];

  const takeHomeDataColumns = [
    {
      name: "Drug Name",
      selector: (row) => `${row.drugType}. ${row.drugName}`,
      sortable: true,
      grow: 1.8,
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
      selector: (row) => {
        const days = row.duration;
        return `${days} ${days === 1 ? "day" : "days"}`;
      },
    },
    {
      name: "Frequency",
      selector: (row) =>
        `${row.frequency[0]} - ${row.frequency[1]} - ${row.frequency[2]}`,
    },
    {
      name: "Administraion Details",
      selector: (row) => row.details,
      grow: 1.8,
    },
    {
      name: "Operation",
      cell: (item) => (
        <div className="">
          <button
            type="button"
            className="btn btn-danger btn-sm  mr-1 mr-xl-3"
            onClick={() =>
              handleDeleteTakeHomeDrugRecordInMasterRecord(item._id)
            }
          >
            <Trash3Fill />
          </button>
        </div>
      ),
    },
  ];

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

  // *************** premedication Pagination start and function **********
  const [preDrugPerPage, setPreDrugPerPage] = useState(5);
  const [currentPrePage, setCurrentPrePage] = useState(1);
  const [searchPreData, setSearchPreData] = useState(""); // value

  const handlePremedicationPageChange = (event, newPage) => {
    setCurrentPrePage(newPage + 1);
  };

  const handlePremedicationPerRowsChange = (event) => {
    console.log("+event.target.value", +event.target.value);
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
      preTableData && preTableData.find((item) => row._id === item._id);
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

  const isPremedicationDataSelected = (id) => selected.indexOf(id) !== -1;

  const handlePremedicationDataSubmit = (e) => {
    e.preventDefault();
    if (window.confirm(`Are you sure wanna Add into Premedication Record?`)) {
      const cancerId = cancerDataId;
      const regimenId = regimenDataId;
      const preRefId = selectedAllRowData.map((item) => item._id);

      console.log("Submit Data:", cancerDataId, regimenDataId, preRefId);

      dispatch(
        addSinglePremedicationRecordIntoMasterRecord(
          cancerDataId,
          regimenDataId,
          preRefId
        )
      );
      handlePremedicationDataClearSelection();
      handleGetRecords();
    }
  };

  const handlePremedicationDataClearSelection = () => {
    setSearchPreData('');
    setSelected([]);
    setSelectedAllRowData([]);
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
      chemoTableData && chemoTableData.find((item) => row._id === item._id);
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

  const isChemotherapyDataSelected = (id) =>
    selectedChemoData.indexOf(id) !== -1;

  const handleChemotherapyDataSubmit = (e) => {
    e.preventDefault();
    if (window.confirm(`Are you sure wanna Add into Chemotherapy Record?`)) {
      const cancerId = cancerDataId;
      const regimenId = regimenDataId;
      const chemoRefId = selectedAllRowChemoData.map((item) => item._id);
      dispatch(
        addSingleChemotharapyRecordIntoMasterRecord(
          cancerDataId,
          regimenDataId,
          chemoRefId
        )
      );
      handleChemotherapyDataClearSelection();
      handleGetRecords();
    }
  };

  const handleChemotherapyDataClearSelection = () => {
    setSearchChemoData('')
    setSelectedChemoData([]);
    setSelectedAllRowChemoData([]);
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

  const isTakeHomeDataSelected = (id) =>
    selectedTakeHomeData.indexOf(id) !== -1;

  const handleTakeHomeDataSubmit = (e) => {
    e.preventDefault();

    console.log("handleTakeHomeDataSubmit:", selectedAllRowTakeHomeData);

    if (
      window.confirm(
        `Are you sure you want to add into Take Home Treatment Record?`
      )
    ) {
      const cancerId = cancerDataId;
      const regimenId = regimenDataId;
      const takeHomeRefId = selectedAllRowTakeHomeData.map((item) => item._id);
      dispatch(
        addSingleTakeHomeRecordIntoMasterRecord(
          cancerDataId,
          regimenDataId,
          takeHomeRefId
        )
      );
      handleTakeHomeDataClearSelection();
      handleGetRecords();
    }
  };

  const handleTakeHomeDataClearSelection = () => {
    setSearchTakeHomeData('');
    setSelectedTakeHomeData([]);
    setSelectedAllRowTakeHomeData([]);
  };

  const isTakeHomeRowDisabled = (row) => {
    const checkedStatus =
      takeHomeTableData &&
      takeHomeTableData.find((item) => row._id === item._id);
    return !!checkedStatus;
  };

  // ***************  Take Home Pagination end **********

  const handleBackBtn = () => {
    const userConfirmed = window.confirm(
      " Are you sure you want to leave?"
    );
    if (!userConfirmed) {
      return;
    }
    setTimeout(() => {
      navigate(-1);
    }, [500]);
  };

  return (
    <>
      <div className="container-fluid ">
        <div className="">
          <div className="my-4 border rounded-top">
            <div className="bg-info px-3 py-2 rounded-top">
              <div className="row d-flex  ">
                <div className="col-12">
                  <div className=" d-flex align-items-center justify-content-center">
                    <h3 className="m-0 text-white text-center">
                      View Master Records
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <form>
              {/* ========== Form field here ========== */}
              <div className="row mx-1 my-2">
                <div className="col-12">
                  <div className="form-row">
                    <div className="form-group col-sm-12 col-md-6 col-lg-3">
                      <label>Select the type of Cancer</label>
                      <select
                        className="form-control"
                        onChange={handleCancerList}
                      >
                        <option>Choose...</option>
                        {cancerList?.map((data) => {
                          return <option value={data._id}>{data.name}</option>;
                        })}
                      </select>
                    </div>
                    <div className="form-group col-sm-12 col-md-6 col-lg-3">
                      <label>Select the type of Regimen</label>
                      <select
                        className="form-control"
                        onChange={(e) => setRegimenDataId(e.target.value)}
                      >
                        <option selected={!regimenDataId}>Choose...</option>
                        {regimenList?.map((data) => {
                          return <option value={data._id}>{data.name}</option>;
                        })}
                      </select>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3  d-flex align-items-center">
                      {/* <label>&nbsp; </label> */}

                      <div className="d-flex mt-0 mt-md-3 ">
                        <button
                          className=" btn btn-primary mx-1 "
                          onClick={handleGetRecords}
                          disabled={!regimenDataId}
                          type="button"
                        >
                          Get Records
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={clearTable}
                          type="button"
                        >
                          Clear Record
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className=" container-fluid mt-2 p-0 ">
            {/* =========================== Premedication  Table Start ================== */}
            <div className=" my-2">
              <div className="  bg-info px-3 py-2 rounded-top">
                <div className="row d-flex">
                  <div className="col-md-6">
                    <div className=" d-flex align-items-center">
                      <h3 className="m-0 text-white">Premedication Items</h3>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center justify-content-end">
                      <button
                        data-toggle="modal"
                        className="btn btn-light py-2"
                        type="button"
                        data-target="#PremedicationLibFormData"
                        disabled={!btnDisable}
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
                columns={preDataColumns}
                data={preTableData}
                striped={true}
                pagination
                customStyles={customTableStyle}
                selectableRowsHighlight
                highlightOnHover
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
                  <div className="col-md-6">
                    <div className="d-flex align-items-center justify-content-end">
                      <button
                        data-toggle="modal"
                        className="btn btn-light py-2"
                        type="button"
                        data-target="#ChemotherapyLibFormData"
                        disabled={!btnDisable}
                      >
                        {/* Add Drug */}

                        <PlusSquareFill className="d-flex align-items-center bg-primary-text " />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <DataTable
                showGridlines
                className="border"
                columns={chemoDataColumns}
                data={chemoTableData}
                striped={true}
                pagination
                customStyles={customTableStyle}
                selectableRowsHighlight
                highlightOnHover
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
                  <div className="col-md-6">
                    <div className="d-flex align-items-center justify-content-end">
                      <button
                        data-toggle="modal"
                        className="btn btn-light py-2"
                        type="button"
                        data-target="#TakeHomeLibFormData"
                        disabled={!btnDisable}
                      >
                        {/* Add Drug */}

                        <PlusSquareFill className="d-flex align-items-center bg-primary-text " />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <DataTable
                showGridlines
                className="border"
                columns={takeHomeDataColumns}
                data={takeHomeTableData}
                striped={true}
                pagination
                customStyles={customTableStyle}
                selectableRowsHighlight
                highlightOnHover
              />
            </div>
            {/* =========================== Take Home  Table End ================== */}
          </div>

          <div className="d-flex justify-content-between pb-3 ">
            <div className="">
              <button
                type="button"
                className="btn btn-info bg-info px-5"
                onClick={handleBackBtn}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      <>
        {/* ************* Premedication Add Drug List Modal start *********** */}
        <div
          className="modal fade"
          id="PremedicationLibFormData"
          data-backdrop="static"
          data-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          {/* {!closeModal && */}
          <div className="modal-dialog modal-xl">
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
                  // onClick={() => setPreClearRows(!preClearRows)}
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
                          aria-label="Search"
                          value={searchPreData}
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
                                        {row.frequency[0]} - {row.frequency[1]}{" "}
                                        - {row.frequency[2]}
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
                            onRowsPerPageChange={
                              handlePremedicationPerRowsChange
                            }
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
                    onClick={handlePremedicationDataClearSelection}
                    disabled={selected.length > 0 ? false : true}
                  >
                    Clear
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger "
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
          id="ChemotherapyLibFormData"
          data-backdrop="static"
          data-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl">
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
                                      selectedChemoData.length <
                                      chemoData.length
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
                                  const isChemoDisabled =
                                    isChemoRowDisabled(row);

                                  return (
                                    <TableRow
                                      key={row._id}
                                      hover={!isChemoDisabled}
                                      // onClick={() =>
                                      //   !isChemoDisabled &&
                                      //   handleChemotherapyDataSelectRow(row)
                                      // }
                                      // role="checkbox"
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
                            onRowsPerPageChange={
                              handleChemotherapyPerRowsChange
                            }
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
          id="TakeHomeLibFormData"
          data-backdrop="static"
          data-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl">
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
                                      takeHomeMediData.length
                                    }
                                    checked={
                                      takeHomeMediData.length > 0 &&
                                      selectedTakeHomeData.length ===
                                      takeHomeMediData.length
                                    }
                                    onChange={(event) =>
                                      setSelectedTakeHomeData(
                                        event.target.checked
                                          ? takeHomeMediData.map(
                                            (row) => row._id
                                          )
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
                              {takeHomeMediData &&
                                takeHomeMediData.length > 0 ? (
                                takeHomeMediData.map((row) => {
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
                                        {row.frequency[0]} - {row.frequency[1]}{" "}
                                        - {row.frequency[2]}
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
      </>

      <PremedicationInsertForm />

      <ChemoInsertForm />

      <TakeHomeInsertForm />
    </>
  );
};

export default ViewMasterRecord;
