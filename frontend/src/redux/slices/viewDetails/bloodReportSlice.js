import { createSlice } from "@reduxjs/toolkit";

const bloodReportSlice = createSlice({
    name: 'bloodReport',
    initialState: {
        getSinglePatientBloodReports: [],
        loading: false,
        error: null,
        message: null
    },
    reducers: {
        getPatientBloodReportRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        getPatientBloodReportSuccess(state, action) {
            return {
                ...state,
                loading: false,
                error: null,
                getSinglePatientBloodReports: action.payload?.data,
                message: action.payload.message
            }
        },
        getPatientBloodReportFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
                message: action.payload
            }
        },

        clearGetPatientBloodReport(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
                message: action.payload,
                getSinglePatientBloodReports: [],
            }
        },
    }
});

const { actions, reducer } = bloodReportSlice;

export const {

    getPatientBloodReportRequest,
    getPatientBloodReportSuccess,
    getPatientBloodReportFail,
    clearGetPatientBloodReport
} = actions;

export default reducer;
