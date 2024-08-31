import React, { useState, useEffect } from "react";
import {
  PencilSquare,
  PlusSquareFill,
  Trash3Fill,
} from "react-bootstrap-icons";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  getChemotherapyDrugs,
  getChemotherapyDrugsForTreatmentPageModule,
  getPremedicationDrug,
  getPremedicationDrugForTreatmentPageModule,
  getTakeHomeDrugs,
  getTakeHomeDrugsForTreatmentPageModule,
} from "../../../redux/actions/drugAction";
import { getQueryParam } from "../../../helpers/getQueryParams";
import { getSinglePatientRecord } from "../../../redux/actions/patientAction";
import moment from "moment";
import {
  getCancerList,
  getChemoRecord,
  getPremediRecord,
  getRegimenList,
  getTakeHomeRecord,
} from "../../../redux/actions/masterRecordAction";
import {
  ChemotherapyTreatmentUpdateForm,
  PremedicationTreatmentUpdateForm,
  TakeHomeTreatmentUpdateForm,
} from "../../../components/doctorComponents/treatFormUpdate";
import {
  ChemoInsertForm,
  PremedicationInsertForm,
  TakeHomeInsertForm,
} from "../../../components/doctorComponents/AllForm";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router
import {
  UpdatedDataSubmitPatientMainTreatmentFrom,
  getForUpdatePatientMainTreatmentFromAction,
  submitPatientMainTreatmentFrom,
  uploadBloodReport,
} from "../../../redux/actions/treatmentPageAction/mainForm";
import { toast } from "react-toastify";
import { patientMainTreatmentFormClearMsg } from "../../../redux/slices/treatmentSlice/mainTreatmentSlice";
import { getUser } from "../../../redux/actions/authAction";
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


const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const EditForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault(); // For older browsers
      event.returnValue = ""; // For modern browsers
    };
    window.addEventListener("beforeunload", handleBeforeUnload);


    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);


  // get single id
  const patient_id = getQueryParam("patient_id");
  const cycleTestName = getQueryParam("cycleName");
  const data_id = getQueryParam("date_id");
  const date = getQueryParam("date");
  const day = getQueryParam("day");

  console.log("cycleTestName:", cycleTestName);
  console.log("date_id:", data_id);

  const {
    message: dateMsg,
    error: dateErr,
    cycleTestLists,
    getSingleCycleTestList,
  } = useSelector((state) => state.patientCycleTestAndDate);

  console.log("getSingleCycleTestList:", getSingleCycleTestList);
  // patient records
  const [patientTreatmentRecord, setPatientTreatmentRecord] = useState(
    getSingleCycleTestList
  );

  const {
    message,
    error,
    isLoading,
    getGeneralInfo,
    getPremedicationItems,
    getChemotherapyItems,
    getTakeHomeItems,
  } = useSelector((state) => state.createMainTreatmentForm);

  const { user } = useSelector((state) => state.authState)


  console.log("sgetGeneralInfo:", getGeneralInfo);
  console.log("sgetPremedicationItems:", getPremedicationItems);
  console.log("sgetChemotherapyItems:", getChemotherapyItems);
  console.log("sgetTakeHomeItems:", getTakeHomeItems);

  // patients treatments data handle
  const [preTreatmentData, setPreTreatmentData] = useState([]);
  const [chemoTreatmentData, setChemoTreatmentData] = useState([]);
  const [takeHomeTreatmentData, setTakeHomeTreatmentData] = useState([]);
  const [generalInfoData, setGeneralInfoData] = useState({});
  const [doctorDetails, setDoctorDetails] = useState({});


  console.log("generalInfoData:", generalInfoData);
  console.log("doctorDetails:", doctorDetails);

  // set into local variable for treatments
  useEffect(() => {
    setGeneralInfoData(getGeneralInfo);
    setPreTreatmentData(getPremedicationItems);
    setChemoTreatmentData(getChemotherapyItems);
    setTakeHomeTreatmentData(getTakeHomeItems);
    setPatientTreatmentRecord(patientTreatmentRecord);
    setDoctorDetails(user);
  }, [
    getPremedicationItems,
    getChemotherapyItems,
    getTakeHomeItems,
    patientTreatmentRecord,
    user
  ]);

  // get drugs for sigle patient
  useEffect(() => {
    dispatch(
      getForUpdatePatientMainTreatmentFromAction(
        patient_id,
        cycleTestName,
        data_id,
        date,
        day
      )
    );

  }, [patient_id, cycleTestName, date, day, data_id]);

  // getting current date
  // var currentDate = moment(new Date()).format("DD-MM-YYYY");

  const [btns, setBtns] = useState(false);

  // *************** premedication Pagination start **********

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // *************** premedication Pagination end **********

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

  const { patient } = useSelector((state) => state.patientInfo);

  // //connect to store , fetct cancer list  data from Database

  const { cancerList, regimenList } = useSelector(
    (state) => state.cancerDataState
  );

  console.log("cancerList:", cancerList);

  console.log("regimenList:", regimenList);

  // get patient cycle test and dates for treatments form

  const { singleDateTreatmentRecord } = useSelector(
    (state) => state.getPatientRecordForDate
  );

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

  // console.log("Create Message:", message);
  // console.log("Create Error Message:", error);
  // console.log("single Date Treatment Record:", singleDateTreatmentRecord);

  // assing to variable
  const premedicationDataStore = preDrugs;
  const chemotherapyDataStore = chemoDrugs;
  const takeHomesDataStore = takeHomeDrugs;

  console.log("premedicationDataStore:", premedicationDataStore);

  const checkPreTreatmentData = preTreatmentData.length === 0 ? true : false;
  const checkChemoTreatmentData =
    chemoTreatmentData.length === 0 ? true : false;
  const checkTakeHomeTreatmentData =
    takeHomeTreatmentData.length === 0 ? true : false;

  const disabledBtn =
    preTreatmentData.length === 0 &&
      chemoTreatmentData.length === 0 &&
      takeHomeTreatmentData.length === 0
      ? true
      : false;

  // update stored data
  const [preDataUpdateID, setPreDataUpdateID] = useState({});
  const [chemoDataUpdateID, setChemoDataUpdateID] = useState({});
  const [takeHomeDataUpdateID, setTakeHomeDataUpdateID] = useState([]);

  const [filteredTreatmentRecord, setFilteredTreatmentRecord] = useState([]);
  console.log("filteredTreatmentRecord:", filteredTreatmentRecord);
  const treatmentDate =
    filteredTreatmentRecord.length > 0 && filteredTreatmentRecord[0].date
      ? filteredTreatmentRecord[0].date
      : null;
  console.log("filteredTreatmentRecord  date:", treatmentDate);

  useEffect(() => {
    dispatch(getCancerList());
  }, [dispatch]);

  console.log("chemoTreatmentData:", chemoTreatmentData);

  // **********************  Patient treatment record function  Start ****************
  useEffect(() => {
    if (patientTreatmentRecord.length > 0) {
      const filterRecord = (records, cycleTestName, dateId) => {
        let result = [];
        for (const record of records) {
          if (record.cycleTestName === cycleTestName) {
            const dateRecord = record.appointmentDates.find(
              (dateObj) => dateObj._id === dateId
            );
            if (dateRecord) {
              result.push(dateRecord);
            }
          }
        }
        return result;
      };

      const result = filterRecord(
        patientTreatmentRecord,
        cycleTestName,
        data_id
      );
      setFilteredTreatmentRecord(result);
    }
  }, [patientTreatmentRecord, cycleTestName, data_id]);

  // **********************  Patient treatment record function  end ****************

  // ******** separate stored data  **********
  const [preData, setPreData] = useState([]);
  const [chemoData, setChemoData] = useState([]);
  const [takeHomeMediData, setTakeHomeMediData] = useState([]);



  useEffect(() => {
    const premedicationDataStore = preDrugs.map((item) => ({
      ...item,
      signature: item.signature === "Dr.Name" ? doctorDetails?.name : item.signature,
    }));

    const chemotherapyDataStore = chemoDrugs.map((item) => ({
      ...item,
      signature: item.signature === "Dr.Name" ? doctorDetails?.name : item.signature,
    }));

    const takeHomesDataStore = takeHomeDrugs.map((item) => ({
      ...item,
      signature: item.signature === "Dr.Name" ? doctorDetails?.name : item.signature,
    }));

    setPreData(premedicationDataStore);
    setChemoData(chemotherapyDataStore);
    setTakeHomeMediData(takeHomesDataStore);
  }, [preDrugs, chemoDrugs, takeHomeDrugs]);



  const [cancerDataId, setCancerDataId] = useState("");
  const [regimenDataId, setRegimenDataId] = useState("");

  const [cancerType, setCancerType] = useState("");
  const [regimenType, setRegimenType] = useState("");

  // console.log("preTreatmentData:", preTreatmentData);
  // console.log("preTreatmentData typeOf:", typeof (preTreatmentData));
  console.log("cancerDataId:", cancerDataId);
  console.log("regimenDataId:", regimenDataId);
  console.log("patientTreatmentRecord:", patientTreatmentRecord);

  // console.log("chemoTreatmentData:", chemoTreatmentData);
  // console.log("takeHomeTreatmentData:", takeHomeTreatmentData);

  // get single patients records, pre, chemo, takehome data records
  useEffect(() => {
    dispatch(getSinglePatientRecord(patient_id));
  }, [dispatch, patient_id]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      setTimeout(() => {
        dispatch(patientMainTreatmentFormClearMsg());
      }, 100);
      return;
    }
    if (error) {
      toast.error(error);
      setTimeout(() => {
        dispatch(patientMainTreatmentFormClearMsg());
      }, 100);
      return;
    }
  }, [message, error]);


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
      preTreatmentData && preTreatmentData.find((item) => row._id === item._id);
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
    setSearchPreData('')
    setSelected([]);
    setSelectedAllRowData([]);
  };

  const isPremedicationDataSelected = (id) => selected.indexOf(id) !== -1;

  const handlePremedicationDataSubmit = (e) => {
    e.preventDefault();
    setPreTreatmentData((prevData) => {
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

  // *******  Premedication data update handler *********
  const premedicationUpdatedData = (updateData) => {
    const filterData = preTreatmentData.filter(
      (data) => data._id !== updateData._id
    );
    const combinedData = [...filterData, updateData];
    const getData = combinedData.sort((a, b) => {
      // Example: Sort by drugName alphabetically
      if (a.drugName < b.drugName) return -1;
      if (a.drugName > b.drugName) return 1;
      return 0;
    });
    setPreTreatmentData(getData);
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
      chemoTreatmentData && chemoTreatmentData.find((item) => row._id === item._id);
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
      newSelectedChemoData = newSelectedChemoData.concat(selectedChemoData, row._id);
      newSelectedAllRowChemoData.push(row);
    } else if (selectedIndex === 0) {
      newSelectedChemoData = newSelectedChemoData.concat(selectedChemoData.slice(1));
      newSelectedAllRowChemoData = newSelectedAllRowChemoData.filter(
        (data) => data._id !== row._id
      );
    } else if (selectedIndex === selectedChemoData.length - 1) {
      newSelectedChemoData = newSelectedChemoData.concat(selectedChemoData.slice(0, -1));
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

  const isChemotherapyDataSelected = (id) => selectedChemoData.indexOf(id) !== -1;

  const handleChemotherapyDataSubmit = (e) => {
    e.preventDefault();
    setChemoTreatmentData((prevData) => {
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


  const chemotherapyUpdatedData = (updateData) => {
    const filterChemoData = chemoTreatmentData.filter(
      (data) => data._id !== updateData._id
    );
    const combinedData = [...filterChemoData, updateData];
    const getData = combinedData.sort((a, b) => {
      // Example: Sort by drugName alphabetically
      if (a.drugName < b.drugName) return -1;
      if (a.drugName > b.drugName) return 1;
      return 0;
    });
    setChemoTreatmentData(getData);
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
  const [selectedAllRowTakeHomeData, setSelectedAllRowTakeHomeData] = useState([]);

  console.log("selectedTakeHomeData :", selectedTakeHomeData);
  console.log("selectedAllRowTakeHomeData :", selectedAllRowTakeHomeData);

  const handleTakeHomeDataSelectRow = (row) => {
    const selectedIndex = selectedTakeHomeData.indexOf(row._id);
    let newSelectedTakeHomeData = [];
    let newSelectedAllRowTakeHomeData = [...selectedAllRowTakeHomeData];

    if (selectedIndex === -1) {
      newSelectedTakeHomeData = newSelectedTakeHomeData.concat(selectedTakeHomeData, row._id);
      newSelectedAllRowTakeHomeData.push(row);
    } else if (selectedIndex === 0) {
      newSelectedTakeHomeData = newSelectedTakeHomeData.concat(selectedTakeHomeData.slice(1));
      newSelectedAllRowTakeHomeData = newSelectedAllRowTakeHomeData.filter(
        (data) => data._id !== row._id
      );
    } else if (selectedIndex === selectedTakeHomeData.length - 1) {
      newSelectedTakeHomeData = newSelectedTakeHomeData.concat(selectedTakeHomeData.slice(0, -1));
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
      takeHomeTreatmentData &&
      takeHomeTreatmentData.find((item) => row._id === item._id);
    return !!checkedStatus;
  };

  const isTakeHomeDataSelected = (id) => selectedTakeHomeData.indexOf(id) !== -1;

  const handleTakeHomeDataSubmit = (e) => {
    e.preventDefault();
    setTakeHomeTreatmentData((prevData) => {
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


  const takeHomeUpdatedData = (updateData) => {
    const TakeHomefilterData = takeHomeTreatmentData.filter(
      (data) => data._id !== updateData._id
    );
    const combinedData = [...TakeHomefilterData, updateData];
    const getData = combinedData.sort((a, b) => {
      // Example: Sort by drugName alphabetically
      if (a.drugName < b.drugName) return -1;
      if (a.drugName > b.drugName) return 1;
      return 0;
    });
    setTakeHomeTreatmentData(getData);
  };


  // ************************* Treatments Table columns start ***********************
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
      selector: (row) =>
        `${row.frequency[0]} - ${row.frequency[1]} - ${row.frequency[2]}`,
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
    {
      name: "Signature",
      selector: (row) => row?.signature,
    },
    {
      name: "Operation",
      cell: (item) => (
        <div className="">
          <button
            data-toggle="modal"
            data-target="#PremedicationUpdateInTreatmentForm"
            type="button"
            className="btn btn-primary btn-sm  mr-1 mr-xl-3"
            onClick={() => {
              handlePreModelShow();
              setPreDataUpdateID(item);
            }}
          >
            <PencilSquare />
          </button>
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
      name: "Dose",
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
    {
      name: "Signature",
      selector: (row) => doctorDetails?.name,
    },
    {
      name: "Operation",
      cell: (item) => (
        <div className="">
          <button
            data-toggle="modal"
            data-target="#ChemotherapyUpdateInTreatmentForm"
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
            onClick={() => handleDeleteChemotherapyTreatmentRecords(item._id)}
          >
            <Trash3Fill />
          </button>
        </div>
      ),
      grow: 1.1,
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
      selector: (row) =>
        `${row.frequency[0]} - ${row.frequency[1]} - ${row.frequency[2]}`,
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
    {
      name: "Signature",
      selector: (row) => doctorDetails?.name,
    },
    {
      name: "Operation",
      cell: (item) => (
        <div className="">
          <button
            data-toggle="modal"
            data-target="#TakeHomeUpdateInTreatmentForm"
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
            onClick={() => handleDeleteTakeHomeTreatmentRecords(item._id)}
          >
            <Trash3Fill />
          </button>
        </div>
      ),
    },
  ];
  // ************************* Treatments Table columns end ***********************


  // ******** form submit data handling start here ****************

  const [cancerName, setCancerName] = useState();
  const [regimenName, setRegimenName] = useState();

  const handleDeletePremeditionTreatmentRecords = async (id) => {
    if (window.confirm("Are you sure wanna Delete this Record ?")) {
      const filterData = preTreatmentData.filter((data) => data._id !== id);
      console.log("pre filterData:", filterData);
      setPreTreatmentData([...filterData]);
    }
  };

  const handleDeleteChemotherapyTreatmentRecords = async (id) => {
    if (window.confirm("Are you sure wanna Delete this Record ?")) {
      const filterData = chemoTreatmentData.filter((data) => data._id !== id);
      console.log("Chemo filterData:", filterData);
      setChemoTreatmentData([...filterData]);
    }
  };

  const handleDeleteTakeHomeTreatmentRecords = async (id) => {
    if (window.confirm("Are you sure wanna Delete this Record ?")) {
      const filterData = takeHomeTreatmentData.filter(
        (data) => data._id !== id
      );
      console.log("Chemo filterData:", filterData);
      setTakeHomeTreatmentData([...filterData]);
    }
  };

  // *******************  treatment form Submit ***************************
  const [data, setData] = useState({
    cancerType: "",
    regimenType: "",
    dayOfCycle: "",
    currentDate: "",
    patientName: "",
    patientAge: "",
    patientGender: "",
    patientUhid: "",
    patientIp: "",
    patientHeight: "",
    patientWeight: "",
    patientBSA: "",
    patientComments: "",
    patientConsultant: "",
    patientBloodReportComment: "",
    uploadBloodReport: "",
  });

  function treatmentSetData() {

    setData({
      cancerType: generalInfoData?.cancerType,
      regimenType: generalInfoData?.regimenType,
      dayOfCycle: generalInfoData?.dayOfCycle,
      currentDate: generalInfoData?.currentDate,
      patientName: generalInfoData?.patientName,
      patientAge: generalInfoData?.patientAge,
      patientGender: generalInfoData?.patientGender,
      patientUhid: generalInfoData?.patientUhid,
      patientIp: generalInfoData?.patientIp,
      patientHeight: generalInfoData?.patientHeight,
      patientWeight: generalInfoData?.patientWeight,
      patientBSA: generalInfoData?.patientBSA,
      patientComments: generalInfoData?.patientComments,
      patientConsultant: generalInfoData?.patientConsultant,
      patientBloodReportComment: generalInfoData?.patientBloodReportComment,
      uploadBloodReport: generalInfoData?.uploadBloodReport,
    });
  }



  const [errors, setErrors] = useState({});

  // const onChangeCancerListHandler = (e) => {
  //   handleCancerList(e);
  //   handleChange(e);
  //   setRegimenType("");
  //   setRegimenDataId("");

  //   setPreTreatmentData([]);
  //   setChemoTreatmentData([]);
  //   setTakeHomeTreatmentData([]);
  // };

  // const onChangeRegimenListHandler = (e) => {
  //   handleChange(e);
  //   setRegimenDataId(e.target.value);
  // };

  const [bsaValueErr, setValueErr] = useState("");

  const validateFormData = (data) => {
    const errors = {};
    // Validate cancerType
    if (!data.cancerType || typeof data.cancerType !== "string") {
      errors.cancerType = "Cancer type is required and must be a string";
    }

    // Validate regimenType
    if (!data.regimenType || typeof data.regimenType !== "string") {
      errors.regimenType = "Regimen type is required";
    }

    // Validate dayOfCycle
    if (!data.dayOfCycle || typeof data.dayOfCycle !== "string") {
      errors.dayOfCycle = "Day of cycle is required and must be a string";
    }

    // Validate currentDate
    if (!data.currentDate || typeof data.currentDate !== "string") {
      errors.currentDate = "Current date is required and must be a string";
    }

    // Validate patientName
    if (!data.patientName || typeof data.patientName !== "string") {
      errors.patientName = "Patient name is required and must be a string";
    }

    // Validate patientAge
    if (
      data.patientAge === undefined ||
      typeof data.patientAge !== "number" ||
      data.patientAge <= 0
    ) {
      errors.patientAge =
        "Patient age is required and must be a positive number";
    }

    // Validate patientGender
    if (!data.patientGender || typeof data.patientGender !== "string") {
      errors.patientGender = "Patient gender is required and must be a string";
    }

    // Validate patientUhid
    if (
      data.patientUhid === undefined ||
      typeof data.patientUhid !== "number" ||
      data.patientUhid <= 0
    ) {
      errors.patientUhid =
        "Patient UHID is required and must be a positive number";
    }

    // Validate patientIp
    if (
      data.patientIp === undefined ||
      typeof data.patientIp !== "number" ||
      data.patientIp <= 0
    ) {
      errors.patientIp = "Patient IP is required and must be a positive number";
    }

    // Validate patientHeight
    if (
      data.patientHeight === undefined ||
      typeof data.patientHeight !== "number" ||
      data.patientHeight <= 0
    ) {
      errors.patientHeight =
        "Patient height is required and must be a positive number";
    }

    // Validate patientWeight
    if (
      data.patientWeight === undefined ||
      typeof data.patientWeight !== "number" ||
      data.patientWeight <= 0
    ) {
      errors.patientWeight =
        "Patient weight is required and must be a positive number";
    }

    // Validate patientBSA
    if (
      bsaValue === undefined ||
      typeof bsaValue !== "number" ||
      bsaValue <= 0
    ) {
      setValueErr("Patient BSA is required and must be a positive number");
    }

    // Validate patientComments
    if (
      data.patientComments === undefined ||
      typeof data.patientComments !== "string" ||
      data.patientComments.trim() === ""
    ) {
      errors.patientComments = "Patient comments must be a string";
    }

    // Validate patientConsultant
    if (
      data.patientConsultant === undefined ||
      data.patientConsultant.trim() === ""
    ) {
      errors.patientConsultant = "Patient consultant must be a string";
    }

    // Validate patientBloodReportComment
    if (
      data.patientBloodReportComment === undefined ||
      data.patientBloodReportComment.trim() === ""
    ) {
      errors.patientBloodReportComment =
        "Patient blood report comment must be a string";
    }

    // if (file) {
    //   console.log("File must be a PDF Only files:", file);
    //   if (!["application/pdf"].includes(file.type)) {
    //     errors.file = "File must be a PDF Only";
    //   } else if (file.size > 5 * 1024 * 1024) {
    //     errors.file = "File must be less than 5 MB";
    //   }
    // }
    return errors;
  };

  useEffect(() => {
    if (patient) {
      treatmentSetData();
    }
  }, [patient]);

  const handleChange = (e) => {

    const { name, value } = e.target;
    let convertedValue = value;

    if (
      [
        "patientHeight",
        "patientWeight",
        // "patientBSA",
        "patientAge",
        "patientUhid",
        "patientIp",
      ].includes(name)
    ) {
      convertedValue = Number(value);
    }
    if (
      [
        "patientComments",
        "patientConsultant",
        "patientBloodReportComment",
      ].includes(name)
    ) {
      convertedValue = String(value);
    }


    if (name == "patientHeight") setHeightValue(value);
    if (name == "patientWeight") setWeightValue(value);
    if (name == "cancerType") setCancerName(value);
    if (name == "regimenType") setRegimenName(value);


    setData({ ...data, [name]: convertedValue });
  };

  const previousHeight = generalInfoData?.patientHeight || 0;
  const previousWeight = generalInfoData?.patientWeight || 0;
  const previousCancerName = generalInfoData?.cancerType || '';
  const previousRegimenName = generalInfoData?.regimenType || '';
  const previousFilePath = generalInfoData?.uploadBloodReport || '';


  const [heightValue, setHeightValue] = useState(previousHeight);
  const [WeightValue, setWeightValue] = useState(previousWeight);
  const [file, setFile] = useState(previousFilePath);

  console.log("path file:", file);

  useEffect(() => {
    setHeightValue(previousHeight);
    setWeightValue(previousWeight);
    setCancerName(previousCancerName);
    setRegimenName(previousRegimenName);
    setFile(previousFilePath)
  }, [previousHeight, previousWeight, previousCancerName, previousRegimenName, previousFilePath])

  //calculate bsa previous value
  const previousBSA = (generalInfoData?.patientWeight + generalInfoData?.patientHeight);

  console.log("previousBSA :", previousBSA);
  console.log("previousHeight bsa :", previousHeight, "| heightValue:", heightValue);
  console.log("previousWeight bsa :", previousWeight, "| WeightValue:", WeightValue);

  //store bsa when we Already calculated bsa previous value 
  const [bsaValue, setBsaValue] = useState(previousBSA || 0);

  useEffect(() => {
    console.log("heightValue os bsa:", heightValue);
    console.log("WeightValue os bsa:", WeightValue);
    if (heightValue > 0 || WeightValue > 0) {
      console.log("heightValue is bsa:", heightValue);
      console.log("WeightValue is bsa:", WeightValue);
      setBsaValue(Number(WeightValue) + Number(heightValue));
    }
  }, [WeightValue, heightValue, generalInfoData]);


  const showPDF = (pdf) => {
    window.open(`${BASE_URL}/${pdf}`, '_blank', 'noreferrer')
  }


  const treatmentFormHandleSubmit = (e) => {
    if (
      window.confirm(
        `Are you sure Submit this Record Because After Submit You can't Modify Anything?`
      )
    ) {
      e.preventDefault();
      const validationErrors = validateFormData(data);
      console.log("Test Data Here:", data);
      console.log("validationErrors:", validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        // Handle successful form submission
        console.log("Form data submitted:", data);
        console.log("File:", file);

        const premedicationSubmitData = preTreatmentData;
        const chemoSubmitData = chemoTreatmentData;
        const takeHomeSubmitData = takeHomeTreatmentData;

        console.log("premedication SubmitData:", premedicationSubmitData);
        console.log("chemo Submit Data:", chemoSubmitData);
        console.log("takeHome Submit Data:", takeHomeSubmitData);

        const allData = {
          patientRef_id: patient_id,
          cycleTestName: data?.dayOfCycle,
          updatedDate: data?.currentDate,
          geneInfo: {
            ...data,
            uploadBloodReport: file,
            patientBSA: bsaValue,
            cancerType: cancerName,
            regimenType: regimenName,
          },
          preSubmitData: preTreatmentData,
          chemoSubmitData: chemoTreatmentData,
          takehomeSubmitData: takeHomeTreatmentData,
        };

        console.log("All Datas into treatment from:", allData);
        dispatch(UpdatedDataSubmitPatientMainTreatmentFrom(allData));
        // dispatch(submitPatientMainTreatmentFrom(allData));

        const patientId = patient_id;
        const date = data?.currentDate;

        if (file) {
          console.log("uploadBloodReport uploadBloodReport:");
          //   dispatch(uploadBloodReport(file, patientId, date, cycleTestName));
        }

        // Clear the form
        setData({
          cancerType: "",
          regimenType: "",
          dayOfCycle: "",
          currentDate: "",
          patientName: "",
          patientAge: "",
          patientGender: "",
          patientUhid: "",
          patientIp: "",
          patientHeight: "",
          patientWeight: "",
          patientBSA: "",
          patientComments: "",
          patientConsultant: "",
          patientBloodReportComment: "",
          uploadBloodReport: "",
        });
        setFile(null);
        setErrors({});
        setTimeout(() => {
          navigate(-1);
        }, 500);
        return;
      } else {
        setErrors(validationErrors);
      }
    }
  };

  const handleGoBack = () => {
    const userConfirmed = window.confirm(
      "You have unsaved changes. Are you sure you want to leave?"
    );
    if (!userConfirmed) {
      return;
    }
    if (preTreatmentData.length >= 0) {
      setPreTreatmentData([]);
      setChemoTreatmentData([]);
      setTakeHomeTreatmentData([]);
    }
    setTimeout(() => {
      navigate(-1);
    }, [500]);
  };

  useEffect(() => {
    setPreTreatmentData([]);
    setChemoTreatmentData([]);
    setTakeHomeTreatmentData([]);
  }, []);

  // const handleFileUploadTest = () => {
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   console.log(file);
  // };

  return (
    <>
      {/* *************************  Content Start  ***************************** */}
      <div
        className="container-fluid my-lg-5"
        style={{ overflow: "auto", maxHeight: "calc(100vh - 56pxpx)" }}
      >
        <form onSubmit={treatmentFormHandleSubmit}>
          <div>
            <div className="text-center text-info">
              <h1 className="font-weight-bold">
                Edit ~ {cycleTestName} ~ Day - {day}
              </h1>
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
                    {/* //onSubmit={treatmentFormHandleSubmit}  */}
                    {/* <form onSubmit={treatmentFormHandleSubmit}> */}
                    <div className="form-row">
                      <div className="form-group col-sm-12 col-md-6 col-lg-3">
                        <label>Select the type of Cancer</label>
                        {/* <select
                                                    className="form-control"
                                                    onChange={onChangeCancerListHandler}
                                                    name="cancerType"
                                                >
                                                    <option>Choose...</option>
                                                    {cancerList?.map((data) => {
                                                        return (
                                                            <option value={data._id}> {data.name} </option>
                                                        );
                                                    })}
                                                </select> */}
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleChange}
                          value={data?.cancerType}
                          name="cancerType"
                          list="cancerTypeData"
                        />
                        <datalist id="cancerTypeData">
                          {cancerList?.map((item, key) => (
                            <option key={key} value={item.name} />
                          ))}
                        </datalist>

                        {errors.cancerType && (
                          <p className="text-danger">{errors.cancerType}</p>
                        )}
                      </div>

                      <div className="form-group col-sm-12 col-md-6 col-lg-3">
                        <label>Select the Regimen</label>
                        <input
                          type="text"
                          className="form-control"
                          name="regimenType"
                          list="regimenTypeData"
                          onChange={handleChange}
                          value={data?.regimenType}
                        />
                        <datalist id="regimenTypeData">
                          {regimenList?.map((item, key) => (
                            <option key={key} value={item.name} />
                          ))}
                        </datalist>
                        {errors.regimenType && (
                          <p className="text-danger">{errors.regimenType}</p>
                        )}
                      </div>

                      <div className="form-group col-sm-12 col-md-6 col-lg-3">
                        <fieldset disabled>
                          <label>Day of Cycle Name</label>
                          <input
                            type="text"
                            name="dayOfCycle"
                            className="form-control"
                            onChange={handleChange}
                            value={data?.dayOfCycle}
                            readOnly
                          />
                        </fieldset>
                        {errors.dayOfCycle && (
                          <p className="text-danger">{errors.dayOfCycle}</p>
                        )}
                      </div>
                      <div className="form-group col-sm-12 col-md-6 col-lg-3">
                        <label>Date</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleChange}
                          value={data?.currentDate}
                          name="currentDate"
                          readOnly
                        />
                        {errors.currentDate && (
                          <p className="text-danger">{errors.currentDate}</p>
                        )}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-sm-12 col-md-6 col-lg-3">
                        <label>Patient Name</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleChange}
                          name="patientName"
                          value={data?.patientName}
                          readOnly
                        />
                        {errors.patientName && (
                          <p className="text-danger">{errors.patientName}</p>
                        )}
                      </div>
                      <div className="form-group col-sm-12 col-md-6 col-lg-3">
                        <label>Patient Age</label>
                        <input
                          type="number"
                          className="form-control"
                          onChange={handleChange}
                          name="patientAge"
                          value={data?.patientAge}
                          readOnly
                        />
                        {errors.patientAge && (
                          <p className="text-danger">{errors.patientAge}</p>
                        )}
                      </div>
                      <div className="form-group col-sm-12 col-md-6 col-lg-3">
                        <label>Gender</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleChange}
                          readOnly
                          name="patientGender"
                          value={data?.patientGender}
                        />
                        {errors.patientGender && (
                          <p className="text-danger">{errors.patientGender}</p>
                        )}
                      </div>
                      <div className="form-group col-sm-12 col-md-6 col-lg-3">
                        <label>UHID No.</label>
                        <input
                          type="number"
                          className="form-control"
                          onChange={handleChange}
                          name="patientUhid"
                          readOnly
                          value={data?.patientUhid}
                        />
                        {errors.patientUhid && (
                          <p className="text-danger">{errors.patientUhid}</p>
                        )}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-sm-12 col-md-6 col-lg-3">
                        <label>IP No.</label>
                        <input
                          type="number"
                          className="form-control"
                          onChange={handleChange}
                          name="patientIp"
                          value={data?.patientIp}
                          readOnly
                        />
                        {errors.patientIp && (
                          <p className="text-danger">{errors.patientIp}</p>
                        )}
                      </div>
                      <div className="form-group col-sm-12 col-md-6 col-lg-3">
                        <label>Height (cm)</label>
                        <input
                          type="number"
                          name="patientHeight"
                          className="form-control"
                          onChange={handleChange}
                          value={data?.patientHeight}
                        />
                        {errors.patientHeight && (
                          <p className="text-danger">{errors.patientHeight}</p>
                        )}
                      </div>
                      <div className="form-group col-sm-12 col-md-6 col-lg-3">
                        <label>Weight (kg)</label>
                        <input
                          type="number"
                          name="patientWeight"
                          className="form-control"
                          onChange={handleChange}
                          value={data?.patientWeight}
                        />
                        {errors.patientWeight && (
                          <p className="text-danger">{errors.patientWeight}</p>
                        )}
                      </div>
                      <div className="form-group col-sm-12 col-md-6 col-lg-3">
                        <label>BSA</label>
                        <input
                          type="number"
                          name="patientBSA"
                          className="form-control"
                          // onChange={handleChange}
                          value={bsaValue ? bsaValue : previousBSA}
                        // readOnly

                        />
                        {bsaValueErr && (
                          <p className="text-danger">{bsaValueErr}</p>
                        )}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-sm-12 col-md-6 col-lg-3">
                        <label>Comments</label>
                        <input
                          type="text"
                          name="patientComments"
                          className="form-control"
                          onChange={handleChange}
                          value={data?.patientComments}
                        />
                        {errors.patientComments && (
                          <p className="text-danger">
                            {errors.patientComments}
                          </p>
                        )}
                      </div>
                      <div className="form-group col-sm-12 col-md-6 col-lg-3">
                        <label>Consultant</label>
                        <input
                          type="text"
                          name="patientConsultant"
                          className="form-control"
                          onChange={handleChange}
                          value={data?.patientConsultant}
                        />
                        {errors.patientConsultant && (
                          <p className="text-danger">
                            {errors.patientConsultant}
                          </p>
                        )}
                      </div>
                      <div className="form-group col-sm-12 col-md-6 col-lg-6">
                        <label>Blood Report Comments</label>
                        <input
                          type="text"
                          name="patientBloodReportComment"
                          className="form-control"
                          onChange={handleChange}
                          value={data?.patientBloodReportComment}
                        />
                        {errors.patientBloodReportComment && (
                          <p className="text-danger">
                            {errors.patientBloodReportComment}
                          </p>
                        )}
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

                      {/* <div className="form-group col-sm-12 col-md-3 col-lg-3">
                        <button type="submit" className="btn btn-primary">
                          test submit
                        </button>
                      </div> */}
                    </div>
                    {/* </form> */}
                  </div>
                </div>
              </div>
            </div>

            {/* *******************  premedication table   *********************** */}

            <div className=" container-fluid my-3 p-0 ">
              <div className=" my-2">
                <div className="  bg-info px-3 py-2 rounded-top">
                  <div className="row d-flex">
                    <div className="col-md-6">
                      <div className=" d-flex align-items-center">
                        <h3 className="m-0 text-white">Premedication Items</h3>
                      </div>
                    </div>
                    <div className="col-md-6 ">
                      <div className="d-flex align-items-center justify-content-end">
                        <button
                          data-toggle="modal"
                          className="btn btn-light py-2"
                          type="button"
                          data-target="#PremedicationLibFormData"
                          disabled={disabledBtn}
                        >
                          <PlusSquareFill className="d-flex align-items-center bg-primary-text  " />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <DataTable
                  showGridlines
                  className="border"
                  columns={PremedicationTableColumns}
                  data={preTreatmentData}
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
                      <div className="d-flex align-items-center justify-content-end">
                        <button
                          className="btn btn-light py-2"
                          data-toggle="modal"
                          type="button"
                          data-target="#ChemotherapyLibFormData"
                          disabled={disabledBtn}
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
                  columns={ChemotherapyTableColumns}
                  data={chemoTreatmentData}
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
                      <div className="d-flex align-items-center justify-content-end">
                        {/* <div className="mr-2">
                                            <input
                                                className="form-control"
                                                type="search"
                                                placeholder="Search"
                                                aria-label="Search"
                                                onChange={handleSearch}
                                            />
                                        </div> */}
                        <button
                          className="btn btn-light py-2"
                          data-toggle="modal"
                          type="button"
                          data-target="#TakeHomeForm"
                          disabled={disabledBtn}
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
                  columns={TakeHomeTableColumns}
                  data={takeHomeTreatmentData}
                  striped={true}
                  pagination
                  customStyles={customTableStyle}
                  selectableRowsHighlight
                  highlightOnHover
                />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between py-4">
            <button
              type="button"
              className="btn btn-info px-md-5"
              onClick={handleGoBack}
            >
              Back
            </button>

            <button type="submit" className="btn btn-info px-md-5">
              Update
            </button>
          </div>
        </form>
      </div>

      {/* *********************************** page end ******************************** */}

      {/* ================================================ modal start ====================================== */}

      <PremedicationTreatmentUpdateForm
        showPreModel={showPreModel}
        handlePreModelClose={handlePreModelClose}
        handlePreModelShow={handlePreModelShow}
        setShowPreModel={setShowPreModel}
        item={preDataUpdateID}
        handleGetUpdatedPremedicationData={premedicationUpdatedData}
      />

      <ChemotherapyTreatmentUpdateForm
        showChemoModel={showChemoModel}
        handleChemoModelClose={handleChemoModelClose}
        handleChemoModelShow={handleChemoModelShow}
        setShowChemoModel={setShowChemoModel}
        item={chemoDataUpdateID}
        handleGetUpdatedChemotherapyData={chemotherapyUpdatedData}
      />

      <TakeHomeTreatmentUpdateForm
        showTakeHomeModel={showTakeHomeModel}
        handleTakeHomeModelClose={handleTakeHomeModelClose}
        handleTakeHomeModelShow={handleTakeHomeModelShow}
        setShowTakeHomeModel={setShowTakeHomeModel}
        item={takeHomeDataUpdateID}
        handleGetUpdatedTakeHomeData={takeHomeUpdatedData}
      />

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
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
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
                                    // // onClick={() =>
                                    // //   !isDisabled &&
                                    // //   handlePremedicationDataSelectRow(row)
                                    // // }
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
                          rowsPerPage={preDrugPerPage || 5}
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
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
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
                                    selectedChemoData.length === chemoData.length
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
                                    <TableCell>{row.duration} {row.duration == 1 ? "hrs" : "hrs"}</TableCell>
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
        id="TakeHomeForm"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
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
                                    selectedTakeHomeData.length < takeHomeMediData.length
                                  }
                                  checked={
                                    takeHomeMediData.length > 0 &&
                                    selectedTakeHomeData.length === takeHomeMediData.length
                                  }
                                  onChange={(event) =>
                                    setSelectedTakeHomeData(
                                      event.target.checked
                                        ? takeHomeMediData.map((row) => row._id)
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
                            {takeHomeMediData && takeHomeMediData.length > 0 ? (
                              takeHomeMediData.map((row) => {
                                const isTakeHomeItemSelected = isTakeHomeDataSelected(row._id);
                                const isTakeHomeDisabled = isTakeHomeRowDisabled(row);

                                return (
                                  <TableRow
                                    key={row._id}
                                    hover={!isTakeHomeDisabled}
                                    // onClick={() =>
                                    //   !isTakeHomeDisabled && handleTakeHomeDataSelectRow(row)
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
                                    <TableCell>{row.doseValue} {row.unit} </TableCell>
                                    <TableCell>{row.duration} {row.duration == 1 ? "day" : "days"}</TableCell>
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
                            "& .MuiTablePagination-displayedRows": { margin: 0 },
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


      {/* ************* Add Drug into Premedication Library Modal *********** */}

      <PremedicationInsertForm />

      <ChemoInsertForm />

      <TakeHomeInsertForm />
    </>
  );
};

export default EditForm;
