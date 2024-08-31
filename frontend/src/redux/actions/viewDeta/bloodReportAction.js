import axios from "axios";
import { getPatientBloodReportFail, getPatientBloodReportRequest, getPatientBloodReportSuccess } from "../../slices/viewDetails/bloodReportSlice";


export const getBloodReportFileDetails = (patientRefId, cycleTestName) => async (dispatch) => {
    try {
        dispatch(getPatientBloodReportRequest())
        const response = await axios.get(`${BASE_URL}/getRecords?patientRefId=${patientRefId}&cycleTestName=${cycleTestName}`);
        console.log("response ", response?.data);
        dispatch(getPatientBloodReportSuccess(response?.data));
    } catch (err) {
        console.log(err?.response?.data);
        dispatch(getPatientBloodReportFail(err?.response?.data));
    }
}
