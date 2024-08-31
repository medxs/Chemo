import axios from "axios";

import { patientsFail, patientsRequest, patientsSuccess } from "../slices/patientsSlice";
import { getCreatedProfileFail, getCreatedProfileRequest, getCreatedProfileSuccess } from "../slices/treatmentSlice/yetToStartSlice";
import { getTodayCasesFail, getTodayCasesRequest, getTodayCasesSuccess } from "../slices/treatmentSlice/todayCasesSlice";
import { getAuthToken } from "../../helpers/getAuthToken";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const getPatients = (page, size, search) => async (dispatch) => {
    try {
        dispatch(patientsRequest());
        const response = await axios.get(`${BASE_URL}/allPatients?page=${page}&per_page=${size}&search=${search}`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        dispatch(patientsSuccess(response?.data));
    } catch (err) {
        dispatch(patientsFail(err.message));
    }
};

export const getCreatedProfilePatientsList = (page, size, search) => async (dispatch) => {
    try {
        dispatch(getCreatedProfileRequest());
        const response = await axios.get(`${BASE_URL}/allPatients/createdProfileRecord?page=${page}&per_page=${size}&search=${search}`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        dispatch(getCreatedProfileSuccess(response?.data));
    } catch (err) {
        dispatch(getCreatedProfileFail(err.message));
    }
};



export const getTodayCasesPatientRecordsList = (page, size, search) => async (dispatch) => {
    try {
        dispatch(getTodayCasesRequest());
        const response = await axios.get(`${BASE_URL}/allPatients/todayCasesProfileRecord?page=${page}&per_page=${size}&search=${search}`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        dispatch(getTodayCasesSuccess(response?.data));
    } catch (err) {
        dispatch(getTodayCasesFail(err.message));
    }
};

