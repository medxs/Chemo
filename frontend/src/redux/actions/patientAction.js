import axios from "axios";
import { patientCreateRequest, patientCreateSuccess, patientCreateFail, patientSuccess, patientRequest } from '../slices/patientSlice';
import { getPatients } from "./patientsAction";
import { getAuthToken } from "../../helpers/getAuthToken";
import getEnvironmentUrl from "../../helpers/envHelper";
// import { useNavigate } from "react-router-dom";


const BASE_URL = getEnvironmentUrl();


export const createPatientProfile = (data) => async (dispatch) => {
    try {
        console.log("Authorization:", getAuthToken());
        dispatch(patientCreateRequest())
        const response = await axios.post(`${BASE_URL}/CreatePatientsProfile`, data, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        dispatch(patientCreateSuccess(response?.data))
        dispatch(getPatients())
    }
    catch (err) {
        dispatch(patientCreateFail(err?.message))
    }
}

export const getSinglePatientRecord = (id) => async (dispatch) => {
    try {
        dispatch(patientRequest())
        const response = await axios.get(`${BASE_URL}/allPatients/f1/${id}`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        console.log("getSinglePatientRecord response:", response);
        dispatch(patientSuccess(response?.data))
    }
    catch (err) {
        console.log("Get single Record Error:", err);
        dispatch(patientCreateFail(err?.message))
    }
}


























