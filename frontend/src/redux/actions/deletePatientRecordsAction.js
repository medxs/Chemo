import axios from "axios";
import { deletePatientAllRecordFail, deletePatientAllRecordRequest, deletePatientAllRecordSuccess } from "../slices/deletePatientDetailsSlice";
import { getPatients } from "./patientsAction";
import { getAuthToken } from "../../helpers/getAuthToken";
import getEnvironmentUrl from "../../helpers/envHelper";


const BASE_URL = getEnvironmentUrl();

export const deletePatientAllRecordDetails = (patient_id) => async (dispatch) => {
    try {
        dispatch(deletePatientAllRecordRequest())
        const response = await axios.delete(`${BASE_URL}/patient/allDetails/deleteRecord?patient_id=${patient_id}`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        dispatch(deletePatientAllRecordSuccess(response?.data?.message))
        dispatch(getPatients())
    } catch (err) {
        dispatch(deletePatientAllRecordFail(err?.message))
    }
}