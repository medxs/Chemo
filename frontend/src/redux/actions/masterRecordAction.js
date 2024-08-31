import axios from "axios";
import { masterRecordCreateFail, masterRecordCreateRequest, masterRecordCreateSuccess } from "../slices/master-record-slices/masterRecordSlice";
import { getCancerListFail, getCancerListRequest, getCancerListSuccess } from "../slices/master-record-slices/getCancerListSlice";
import { getRegimenListFail, getRegimenListRequest, getRegimenListSuccess } from "../slices/master-record-slices/getRegimenListSlice";
import { clearPremedicationDataMasterList, getPremedicationMasterListFail, getPremedicationMasterListRequest, getPremedicationMasterListSuccess } from "../slices/master-record-slices/getPreMedicationMasterListSlice";
import { clearChemotherapyDataMasterList, getChemotherapyMasterListFail, getChemotherapyMasterListRequest, getChemotherapyMasterListSuccess } from "../slices/master-record-slices/getChemotherapyMasterListSlice";
import { clearTakeHomeDataMasterList, getTakeHomeMasterListFail, getTakeHomeMasterListRequest, getTakeHomeMasterListSuccess } from "../slices/master-record-slices/getTakeHomeMasterListSlice";
import { addPreDrugFail, addPreDrugRequest, addPreDrugSuccess, deletePreDrugFail, deletePreDrugRequest, deletePreDrugSuccess } from "../slices/preDrugSlice";
import { addChemoDrugFail, addChemoDrugRequest, addChemoDrugSuccess, deleteChemoDrugFail, deleteChemoDrugRequest, deleteChemoDrugSuccess } from "../slices/chemoDrugSlice";
import { addTakeHomeDrugFail, addTakeHomeDrugRequest, addTakeHomeDrugSuccess, deleteTakeHomeDrugFail, deleteTakeHomeDrugRequest, deleteTakeHomeDrugSuccess } from "../slices/takeHomeDrugSlice";
import { getAuthToken } from "../../helpers/getAuthToken";



const BASE_URL = process.env.REACT_APP_BACKEND_URL;


export const createMasterRecord = (data) => async (dispatch) => {
    try {
        dispatch(masterRecordCreateRequest())
        const response = await axios.post(`${BASE_URL}/master-record/create`, data, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        })

        dispatch(masterRecordCreateSuccess(response?.data?.message));
    } catch (err) {
        dispatch(masterRecordCreateFail(err?.message));
    }
}

export const getCancerList = () => async (dispatch) => {
    try {
        dispatch(getCancerListRequest())
        const response = await axios.get(`${BASE_URL}/master-record/cancer-list`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        })
        dispatch(getCancerListSuccess(response?.data));
    } catch (err) {
        dispatch(getCancerListFail(err?.message));
    }
}



export const getRegimenList = (data) => async (dispatch) => {
    try {
        dispatch(getRegimenListRequest())
        const response = await axios.get(`${BASE_URL}/master-record/regimen-list?cancerId=${data.cancerId}`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        })
        dispatch(getRegimenListSuccess(response?.data));
    } catch (err) {
        dispatch(getRegimenListFail(err?.message));
    }
}


export const getPremediRecord = (data) => async (dispatch) => {
    try {
        dispatch(getPremedicationMasterListRequest())
        const response = await axios.get(`${BASE_URL}/master-record/premedication?cancerId=${data.cancerId}&regimenId=${data.regimenId}`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        })
        // console.log("getPremediRecord Response :", response);
        dispatch(getPremedicationMasterListSuccess(response?.data));
    } catch (err) {
        dispatch(getPremedicationMasterListFail(err?.message));
    }
}

export const getChemoRecord = (data) => async (dispatch) => {
    try {
        dispatch(getChemotherapyMasterListRequest())
        const response = await axios.get(`${BASE_URL}/master-record/chemotherapy?cancerId=${data.cancerId}&regimenId=${data.regimenId}`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        })
        dispatch(getChemotherapyMasterListSuccess(response?.data));
    } catch (err) {
        dispatch(getChemotherapyMasterListFail(err?.message));
    }
}

export const getTakeHomeRecord = (data) => async (dispatch) => {
    try {
        dispatch(getTakeHomeMasterListRequest())
        const response = await axios.get(`${BASE_URL}/master-record/takehome?cancerId=${data.cancerId}&regimenId=${data.regimenId}`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        })
        dispatch(getTakeHomeMasterListSuccess(response?.data));
    } catch (err) {
        dispatch(getTakeHomeMasterListFail(err?.message));
    }
}


// add new record into master record for particular cancer and regimen ///// cancerId, regimenId, preRefId 
export const addSinglePremedicationRecordIntoMasterRecord = (cancerDataId, regimenDataId, preRefId) => async (dispatch) => {
    try {
        dispatch(addPreDrugRequest())
        const response = await axios.post(`${BASE_URL}/master-record?cancerId=${cancerDataId}&regimenId=${regimenDataId}&preRefId=${preRefId}`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        dispatch(addPreDrugSuccess(response?.data?.message));
    } catch (err) {
        dispatch(addPreDrugFail(err?.message));
    }
}


// add new record into master record for particular cancer and regimen ///// cancerId, regimenId, chemoRefId 
export const addSingleChemotharapyRecordIntoMasterRecord = (cancerDataId, regimenDataId, chemoRefId) => async (dispatch) => {
    try {
        dispatch(addChemoDrugRequest())
        console.log("Action page:", cancerDataId, regimenDataId, chemoRefId);
        const response = await axios.post(`${BASE_URL}/master-record/chemo?cancerId=${cancerDataId}&regimenId=${regimenDataId}&chemoRefId=${chemoRefId}`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        dispatch(addChemoDrugSuccess(response?.data?.message));
    } catch (err) {
        console.log("err?.message:", err?.message);
        dispatch(addChemoDrugFail(err?.message));
    }
}


// // add new record into master record for particular cancer and regimen ///// cancerId, regimenId, preRefId 
export const addSingleTakeHomeRecordIntoMasterRecord = (cancerDataId, regimenDataId, takeHomeRefId) => async (dispatch) => {
    try {
        dispatch(addTakeHomeDrugRequest())
        const response = await axios.post(`${BASE_URL}/master-record/takeHome?cancerId=${cancerDataId}&regimenId=${regimenDataId}&takeHomeRefId=${takeHomeRefId}`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        dispatch(addTakeHomeDrugSuccess(response?.data?.message));
    } catch (err) {
        dispatch(addTakeHomeDrugFail(err?.message));
    }
}



// ******************  delete request and response for all like pre , chemo, takeHome ******************

// add new record into master record for particular cancer and regimen ///// cancerId, regimenId, preRefId 
export const deleteSinglePremedicationRecordFromMasterRecord = (cancerDataId, regimenDataId, preRefId) => async (dispatch) => {
    try {
        dispatch(deletePreDrugRequest());
        const response = await axios.delete(`${BASE_URL}/master-record?cancerId=${cancerDataId}&regimenId=${regimenDataId}&preRefId=${preRefId}`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        dispatch(deletePreDrugSuccess(response?.data?.message));
    } catch (err) {
        dispatch(deletePreDrugFail(err?.message));
    }
}

// add new record into master record for particular cancer and regimen ///// cancerId, regimenId, chemoRefId 
export const deleteSingleChemotherapyRecordFromMasterRecord = (cancerDataId, regimenDataId, chemoRefId) => async (dispatch) => {
    try {
        dispatch(deleteChemoDrugRequest());
        const response = await axios.delete(`${BASE_URL}/master-record/chemo?cancerId=${cancerDataId}&regimenId=${regimenDataId}&chemoRefId=${chemoRefId}`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        dispatch(deleteChemoDrugSuccess(response?.data?.message));
    } catch (err) {
        dispatch(deleteChemoDrugFail(err?.message));
    }
}

export const deleteSingleTakeHomeRecordFromMasterRecord = (cancerDataId, regimenDataId, takeHomeRefId) => async (dispatch) => {
    try {
        dispatch(deleteTakeHomeDrugRequest());
        const response = await axios.delete(`${BASE_URL}/master-record/takeHome?cancerId=${cancerDataId}&regimenId=${regimenDataId}&takeHomeRefId=${takeHomeRefId}`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        dispatch(deleteTakeHomeDrugSuccess(response?.data?.message));
    } catch (err) {
        dispatch(deleteTakeHomeDrugFail(err?.message));
    }
}








// / ***********  clear data in premedicaiton, chemotherapy, take home  *****************/

export const clearDataInMasterList = () => async (dispatch) => {
    dispatch(clearPremedicationDataMasterList());
    dispatch(clearChemotherapyDataMasterList());
    dispatch(clearTakeHomeDataMasterList());
}
