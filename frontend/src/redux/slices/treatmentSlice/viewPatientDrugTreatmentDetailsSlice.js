import { createSlice } from "@reduxjs/toolkit";

const viewPatientDrugTreatmentDetailsSlice = createSlice({
    name: 'viewPatientDrugTreatmentDetails',
    initialState: {
        patientTreatmentDrugDetails: {},
        isloading: false,
        error: null,
    },
    reducers: {
        viewPatientTreatmentDrugDetailsRequest(state, action) {
            return {
                ...state,
                isloading: true
            }
        },
        viewPatientTreatmentDrugDetailsSuccess(state, action) {
            return {
                ...state,
                patientTreatmentDrugDetails: action.payload.findAppointmentDate,
                isloading: false,
                error: null,
            }
        },
        viewPatientTreatmentDrugDetailsFail(state, action) {
            return {
                ...state,
                isloading: false,
                error: action.payload,
            }
        },
    }
})


const { actions, reducer } = viewPatientDrugTreatmentDetailsSlice;

export const {

    viewPatientTreatmentDrugDetailsRequest,
    viewPatientTreatmentDrugDetailsSuccess,
    viewPatientTreatmentDrugDetailsFail

} = actions;

export default reducer;
