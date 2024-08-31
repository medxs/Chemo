import axios from "axios";
import { getPatientMainTreatmentFormDataFail, getPatientMainTreatmentFormDataRequest, getPatientMainTreatmentFormDataSuccess, patientMainTreatmentFormCreateFail, patientMainTreatmentFormCreateRequest, patientMainTreatmentFormCreateSuccess } from "../../slices/treatmentSlice/mainTreatmentSlice"
import { fileUploadFail, fileUploadRequest, fileUploadSuccess } from "../../slices/fileUploadSlice";
import { getAuthToken } from "../../../helpers/getAuthToken";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;


export const submitPatientMainTreatmentFrom = (data) => async (dispatch) => {
    try {
        dispatch(patientMainTreatmentFormCreateRequest())
        const response = await axios.post(`${BASE_URL}/maintreatment`, data, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        console.log("Main Treatment from:", response?.data?.message);
        dispatch(patientMainTreatmentFormCreateSuccess(response?.data?.message))
    } catch (error) {
        console.log("Error Main Treatment from:", error?.message);
        dispatch(patientMainTreatmentFormCreateFail(error?.message))
    }
}

export const getForUpdatePatientMainTreatmentFromAction = (patient_id, cycleTestName, data_id, date) => async (dispatch) => {
    try {
        dispatch(getPatientMainTreatmentFormDataRequest());
        // console.log("Main Treatment get pass from:", patient_id, cycleTestName, date);
        const response = await axios.get(`${BASE_URL}/maintreatment/get?patient_id=${patient_id}&cycleName=${cycleTestName}&date=${date}`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        // console.log("Main Treatment get from:", response?.data);
        dispatch(getPatientMainTreatmentFormDataSuccess(response?.data?.data));
    } catch (error) {
        console.log("Error Main Treatment from:", error?.message);
        dispatch(getPatientMainTreatmentFormDataFail(error?.message))
    }
}


export const UpdatedDataSubmitPatientMainTreatmentFrom = (data) => async (dispatch) => {
    try {
        dispatch(patientMainTreatmentFormCreateRequest())
        const response = await axios.put(`${BASE_URL}/maintreatment/edit`, data, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        console.log("Main Treatment from:", response?.data?.message);
        dispatch(patientMainTreatmentFormCreateSuccess(response?.data?.message))
    } catch (error) {
        console.log("Error Main Treatment from:", error?.message);
        dispatch(patientMainTreatmentFormCreateFail(error?.message))
    }
}





export const uploadBloodReport = (file, patientId, date, cycleTestName) => async (dispatch) => {

    console.log(file, patientId, date);
    try {
        dispatch(fileUploadRequest());
        // Create FormData instance
        const formData = new FormData();
        formData.append('file', file); // Adjust the field name based on your server-side expectation

        const response = await axios.post(`${BASE_URL}/fileUploads?patientId=${patientId}&date=${date}&cycleTestName=${cycleTestName}`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `${getAuthToken()}`,
            }
        });
        dispatch(fileUploadSuccess(response?.data?.message));
    } catch (error) {
        console.log("Error Main Treatment from:", error?.message);
        dispatch(fileUploadFail(error?.message));
    }
}

