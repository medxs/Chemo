import axios from "axios";

import { addPreDrugRequest, addPreDrugSuccess, addPreDrugFail, readPreDrugRequest, readPreDrugSuccess, readPreDrugFail, deletePreDrugRequest, deletePreDrugSuccess, deletePreDrugFail, updatePreDrugRequest, updatePreDrugSuccess, updatePreDrugFail } from '../slices/preDrugSlice'
import { addTakeHomeDrugFail, addTakeHomeDrugRequest, addTakeHomeDrugSuccess, deleteTakeHomeDrugFail, deleteTakeHomeDrugRequest, deleteTakeHomeDrugSuccess, readTakeHomeDrugFail, readTakeHomeDrugRequest, readTakeHomeDrugSuccess, updateTakeHomeDrugFail, updateTakeHomeDrugRequest, updateTakeHomeDrugSuccess } from "../slices/takeHomeDrugSlice";
import { addChemoDrugFail, addChemoDrugRequest, addChemoDrugSuccess, deleteChemoDrugFail, deleteChemoDrugRequest, deleteChemoDrugSuccess, readChemoDrugFail, readChemoDrugRequest, readChemoDrugSuccess, updateChemoDrugFail, updateChemoDrugRequest, updateChemoDrugSuccess } from "../slices/chemoDrugSlice";
import { getAuthToken } from "../../helpers/getAuthToken";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

// ************************ Premedication Operations start *******************************
// create single premedication records 
export const addPremedicationDrug = (data) => async (dispatch) => {
    const currentPrePage = 1, preDrugPerPage = 5, searchPreData = '';
    try {
        dispatch(addPreDrugRequest())
        const response = await axios.post(`${BASE_URL}/pre/addDrug`, data, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        })
        dispatch(addPreDrugSuccess(response?.data?.message));
        dispatch(getPremedicationDrug(currentPrePage, preDrugPerPage, searchPreData));
    } catch (err) {
        dispatch(addPreDrugFail(err?.message));
    }
}

// export const getAllPremedicationRecordDrug = () => async (dispatch) => {
//     try {
//         dispatch(readPreDrugRequest());
//         const res = await axios.get(`${BASE_URL}/getAllData/allPremedicationRecord`);
//         dispatch(readPreDrugSuccess(res?.data))
//     } catch (error) {
//         dispatch(readPreDrugFail(error?.response?.data?.message))
//     }
// }


// get all premedication record for treatment from DB
export const getPremedicationDrugForTreatmentPageModule = () => async (dispatch) => {
    try {
        dispatch(readPreDrugRequest());
        const res = await axios.get(`${BASE_URL}/getAllData/premedication/treatmentPage`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        dispatch(readPreDrugSuccess(res?.data))
    } catch (error) {
        dispatch(readPreDrugFail(error?.response?.data?.message))
    }
}



// Get all chemotherapy records for treatment from DB
export const getChemotherapyDrugsForTreatmentPageModule = () => async (dispatch) => {
    try {
        dispatch(readChemoDrugRequest());
        const res = await axios.get(`${BASE_URL}/getAllData/chemotherapy/treatmentPage`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        dispatch(readChemoDrugSuccess(res?.data))
    } catch (error) {
        dispatch(readChemoDrugFail(error?.response?.data?.message))
    }
}



// Get all take home records for treatment from DB
export const getTakeHomeDrugsForTreatmentPageModule = () => async (dispatch) => {
    try {
        dispatch(readTakeHomeDrugRequest());
        const res = await axios.get(`${BASE_URL}/getAllData/takehome/treatmentPage`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        dispatch(readTakeHomeDrugSuccess(res?.data))
    } catch (error) {
        dispatch(readTakeHomeDrugFail(error?.response?.data?.message))
    }
}


// Get all premedication records 
export const getPremedicationDrug = (currentPrePage, preDrugPerPage, searchPreData) => async (dispatch) => {
    try {
        dispatch(readPreDrugRequest());
        const res = await axios.get(`${BASE_URL}/getAllData/premedication?page=${currentPrePage}&per_page=${preDrugPerPage}&search=${searchPreData}`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        dispatch(readPreDrugSuccess(res?.data))
    } catch (error) {
        dispatch(readPreDrugFail(error?.response?.data?.message))
    }
}

// Get all chemotherapy records 
export const getChemotherapyDrugs = (currentChemoPage, chemoDrugPerPage, searchChemoData) => async (dispatch) => {
    try {
        dispatch(readChemoDrugRequest());
        const res = await axios.get(`${BASE_URL}/getAllData/chemotherapy?page=${currentChemoPage}&per_page=${chemoDrugPerPage}&search=${searchChemoData}`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        dispatch(readChemoDrugSuccess(res?.data))
    } catch (error) {
        dispatch(readChemoDrugFail(error?.response?.data?.message))
    }
}

// Get all take home records 
export const getTakeHomeDrugs = (currentTakeHomePage, takeHomeDrugPerPage, searchTakeHomeData) => async (dispatch) => {
    try {
        dispatch(readTakeHomeDrugRequest());
        const res = await axios.get(`${BASE_URL}/getAllData/takehome?page=${currentTakeHomePage}&per_page=${takeHomeDrugPerPage}&search=${searchTakeHomeData}`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        dispatch(readTakeHomeDrugSuccess(res?.data))
    } catch (error) {
        dispatch(readTakeHomeDrugFail(error?.response?.data?.message))
    }
}


// delete premedication records 
export const deletePremedicationDrug = (id, currentPrePage, preDrugPerPage) => async (dispatch) => {
    const searchPreData = '';
    try {
        dispatch(deletePreDrugRequest())
        const response = await axios.delete(`${BASE_URL}/pre/addDrug/${id}`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        dispatch(deletePreDrugSuccess(response?.data?.message))
        dispatch(getPremedicationDrug(preDrugPerPage, currentPrePage, searchPreData))
    } catch (err) {
        dispatch(deletePreDrugFail(err?.message))
    }
}

// Update premedication records 
export const updatePremedicaitonDrug = (id, preDrugPerPage, currentPrePage, data) => async (dispatch) => {
    const searchPreData = '';
    try {
        dispatch(updatePreDrugRequest());
        const config = {
            headers: {
                "content-type": "application/json",
            },
        };
        const response = await axios.put(`${BASE_URL}/pre/addDrug/${id}`, data, config, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        })
        dispatch(updatePreDrugSuccess(response?.data?.message));
        dispatch(getPremedicationDrug(currentPrePage, preDrugPerPage, searchPreData));
    }
    catch (err) {
        console.log("Data: ", err?.message);
        dispatch(updatePreDrugFail(err?.message))
    }
}
// ************************ Premedication Operations End ********************************

// ************************ Chemotherapy Operations start *******************************

export const addChemoDrug = (data) => async (dispatch) => {
    const currentChemoPage = 1, chemoDrugPerPage = 5, searchChemoData = '';
    try {
        dispatch(addChemoDrugRequest())
        const response = await axios.post(`${BASE_URL}/chemo/addDrug`, data, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        dispatch(addChemoDrugSuccess(response?.data?.message))
        dispatch(getChemotherapyDrugs(currentChemoPage, chemoDrugPerPage, searchChemoData));
    } catch (err) {
        dispatch(addChemoDrugFail(err?.message));
    }
}



// Get all TakeHome records  not use
export const getChemoDrug = () => async (dispatch) => {
    try {
        dispatch(readChemoDrugRequest());
        const res = await axios.get(`${BASE_URL}/getAllData/addDrug`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        dispatch(readChemoDrugSuccess(res?.data?.chemoData))
    } catch (error) {
        dispatch(readChemoDrugFail(error?.response?.data?.message))
    }
}

// delete TakeHome records 
export const deleteChemoDrug = (id, currentChemoPage, chemoDrugPerPage) => async (dispatch) => {
    const searchChemoData = '';
    try {
        dispatch(deleteChemoDrugRequest())
        const response = await axios.delete(`${BASE_URL}/chemo/addDrug/${id}`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        dispatch(deleteChemoDrugSuccess(response?.data?.message))
        dispatch(getChemotherapyDrugs(currentChemoPage, chemoDrugPerPage, searchChemoData));
    } catch (err) {
        dispatch(deleteChemoDrugFail(err?.message))
    }
}

// Update chemo records 
export const updateChemoDrug = (id, chemoDrugPerPage, currentChemoPage, data) => async (dispatch) => {
    // console.log(`check chemoDrugPerPage: ${chemoDrugPerPage},, currentChemoPage:${currentChemoPage}`);
    const searchChemoData = '';
    try {
        dispatch(updateChemoDrugRequest());

        const response = await axios.put(`${BASE_URL}/chemo/addDrug/${id}`, data, {
            withCredentials: true,
            headers: {
                "content-type": "application/json",
                Authorization: `${getAuthToken()}`,
            }
        })
        dispatch(updateChemoDrugSuccess(response?.data?.message));
        dispatch(getChemotherapyDrugs(chemoDrugPerPage, currentChemoPage, searchChemoData));
    }
    catch (err) {
        console.log("Chemo update fail:", err?.message);
        dispatch(updateChemoDrugFail(err?.message))
    }
}

// ************************ Chemotherapy Operations End *********************************

// ************************ Take Home Operations start **********************************
export const addTakeHomeDrug = (data) => async (dispatch) => {

    const currentTakeHomePage = 1, perPage = 5, searchTakeHomeData = '';
    try {
        dispatch(addTakeHomeDrugRequest())
        const response = await axios.post(`${BASE_URL}/takeHome/addDrug`, data, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        })
        dispatch(addTakeHomeDrugSuccess(response?.data?.message))
        dispatch(getTakeHomeDrugs(currentTakeHomePage, perPage, searchTakeHomeData));
    } catch (err) {
        dispatch(addTakeHomeDrugFail(err?.message));
    }
}

// Get all TakeHome records 
export const getTakeHomeDrug = () => async (dispatch) => {
    try {
        dispatch(readTakeHomeDrugRequest());
        const res = await axios.get(`${BASE_URL}/getAllData/addDrug`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        dispatch(readTakeHomeDrugSuccess(res?.data?.takeHomeData))
    } catch (error) {
        dispatch(readTakeHomeDrugFail(error?.response?.data?.message))
    }
}

// delete TakeHome records 
export const deleteTakeHomeDrug = (id, currentTakeHomePage, takeHomeDrugPerPage, searchTakeHomeData) => async (dispatch) => {
    const searchTakeHomeData = '';
    try {
        dispatch(deleteTakeHomeDrugRequest())
        const response = await axios.delete(`${BASE_URL}/takehome/addDrug/${id}`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        dispatch(deleteTakeHomeDrugSuccess(response?.data?.message));
        dispatch(getTakeHomeDrugs(currentTakeHomePage, takeHomeDrugPerPage, searchTakeHomeData));
    } catch (err) {
        dispatch(deleteTakeHomeDrugFail(err?.message));
    }
}


// Update TakeHome records 
export const updateTakeHomeDrug = (id, takeHomeDrugPerPage, currentTakeHomePage, data) => async (dispatch) => {
    const searchTakeHomeData = ''
  
    try {
        dispatch(updateTakeHomeDrugRequest());
        const config = {
            headers: {
                "content-type": "application/json",
            },
        };
        const response = await axios.put(`${BASE_URL}/takeHome/addDrug/${id}`, data, config, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        })
        dispatch(updateTakeHomeDrugSuccess(response?.data?.message));
        dispatch(getTakeHomeDrugs(currentTakeHomePage, takeHomeDrugPerPage, searchTakeHomeData))
    }
    catch (err) {
        dispatch(updateTakeHomeDrugFail(err?.message))
    }
}

// ************************ Take Home Operations End *******************************
