import axios from "axios";
import { createCycleTestFail, createCycleTestRequest, createCycleTestSuccess, deleteSingleDateFail, deleteSingleDateRequest, deleteSingleDateSuccess, getCycleTestFail, getCycleTestRequest, getCycleTestSuccess } from "../../slices/date-Slice/dateSlice";
import { getAuthToken } from "../../../helpers/getAuthToken";
import getEnvironmentUrl from "../../../helpers/envHelper";


const BASE_URL = getEnvironmentUrl();

// Create Patients treatments form records 
export const createPatientCycleTestRecord = (data) => async (dispatch) => {
    try {
        console.log(data);
        dispatch(createCycleTestRequest())
        const response = await axios.post(`${BASE_URL}/treatment/f1`, data, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        })
        dispatch(createCycleTestSuccess(response?.data?.message));
        dispatch(getPatientCycleTestListSingleRecord())
    } catch (err) {
        dispatch(createCycleTestFail(err?.message));
    }
}



// get single patient Treatment date Records
export const getPatientCycleTestListSingleRecord = (id) => async (dispatch) => {
    try {
        dispatch(getCycleTestRequest())

        const response = await axios.get(`${BASE_URL}/treatment/f1/f2/single/${id}`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        let formatedResponse = []
        if (response?.data?.singleData !== null) {
            formatedResponse = response?.data?.singleData?.cycleTestList
        }
        dispatch(getCycleTestSuccess(formatedResponse));
    } catch (err) {
        dispatch(getCycleTestFail(err?.message));
    }
}



// get single patient Treatment date Records
export const appointmentDataDeleteInTreatmentRecord = (patientRef_id, cycleTestName, appointmentDate) => async (dispatch) => {
    try {
        dispatch(deleteSingleDateRequest());
        const response = await axios.delete(`${BASE_URL}/maintreatment/delete?patientRef_id=${patientRef_id}&cycleTestName=${cycleTestName}&appointmentDate=${appointmentDate}`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        console.log("appointmentDataDeleteInTreatmentRecord:", response);
        dispatch(deleteSingleDateSuccess(response?.data));
    } catch (err) {
        dispatch(deleteSingleDateFail(err?.response?.data?.message));
    }
}


