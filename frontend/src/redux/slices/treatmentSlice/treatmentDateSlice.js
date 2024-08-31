import { createSlice } from "@reduxjs/toolkit";

const singleDateSlice = createSlice({
    name: 'getTreatmentDateRecord',
    initialState: {
        singleDateTreatmentRecord: {},
        isloading: false,
        error: null,
    },
    reducers: {

        getRecordDateForTreatmentRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getRecordDateForTreatmentSuccess(state, action) {
            return {
                ...state,
                singleDateTreatmentRecord: action.payload,
                isloading: false,
                error: null,
            }
        },
        getRecordDateForTreatmentFail(state, action) {
            return {
                ...state,
                isloading: false,
                error: action.payload,
            }
        },
    }
})


const { actions, reducer } = singleDateSlice;

export const {

    getRecordDateForTreatmentRequest,
    getRecordDateForTreatmentSuccess,
    getRecordDateForTreatmentFail

} = actions;

export default reducer;
