import axios from "axios";
import { viewPatientTreatmentDrugDetailsFail, viewPatientTreatmentDrugDetailsRequest, viewPatientTreatmentDrugDetailsSuccess } from "../../slices/treatmentSlice/viewPatientDrugTreatmentDetailsSlice";
import { getAuthToken } from "../../../helpers/getAuthToken";


const BASE_URL = process.env.REACT_APP_BACKEND_URL;

// get treatment Drugs Records for  single patient in  view treatment page Details
export const getViewPatientTreatmentDrugDetailsRecords = (patient_id, cycleTestName, date) => async (dispatch) => {
    try {
        dispatch(viewPatientTreatmentDrugDetailsRequest()) //cycleTestName=Cycle Test 1&date=2024/08/01&patient_id=6686557986efcd08f4076bbc
        const res = await axios.get(`${BASE_URL}/viewDetails/treatment/getRecord?patient_id=${patient_id}&cycleTestName=${cycleTestName}&date=${date}`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            }
        });
        
        dispatch(viewPatientTreatmentDrugDetailsSuccess(res?.data));
    } catch (error) {
       
        dispatch(viewPatientTreatmentDrugDetailsFail());
    }
}