import { createSlice } from "@reduxjs/toolkit";


const mainTreatmentSlice = createSlice({
    name: 'mainForm',
    initialState: {
        mainTreatmentForm: [],
        isloading: false,
        message: null,
        error: null,

        //get data
        getGeneralInfo: {},
        getChemotherapyItems: [],
        getPremedicationItems: [],
        getTakeHomeItems: []

    },
    reducers: {

        //get data 
        getPatientMainTreatmentFormDataRequest(state, action) {
            return {
                ...state,
                isloading: true
            }
        },
        getPatientMainTreatmentFormDataSuccess(state, action) {
            return {
                ...state,
                isloading: false,
                // message: action.payload,
                getGeneralInfo: action.payload?.generalInfo,
                getChemotherapyItems: action.payload?.chemotherapyItems,
                getPremedicationItems: action.payload?.premedicationItems,
                getTakeHomeItems: action.payload?.takeHomeItems
            }
        },
        getPatientMainTreatmentFormDataFail(state, action) {
            return {
                ...state,
                isloading: false,
                error: action.payload,
            }
        },


        // create new record or submit
        patientMainTreatmentFormCreateRequest(state, action) {
            return {
                ...state,
                isloading: true
            }
        },
        patientMainTreatmentFormCreateSuccess(state, action) {
            return {
                ...state,
                isloading: false,
                message: action.payload
            }
        },
        patientMainTreatmentFormCreateFail(state, action) {
            return {
                ...state,
                isloading: false,
                error: action.payload,
            }
        },



        // edit form
        editPatientMainTreatmentFormRequest(state, action) {
            return {
                ...state,
                isloading: true
            }
        },
        editPatientMainTreatmentFormSuccess(state, action) {
            return {
                ...state,
                isloading: false,
                message: action.payload
            }
        },
        editPatientMainTreatmentFormFail(state, action) {
            return {
                ...state,
                isloading: false,
                error: action.payload,
            }
        },


        patientMainTreatmentFormClearMsg(state, action) {
            return {
                ...state,
                isloading: false,
                message: null,
                error: null,
            }
        }


    }
});

const { actions, reducer } = mainTreatmentSlice;

export const {







    //get data
    getPatientMainTreatmentFormDataRequest,
    getPatientMainTreatmentFormDataSuccess,
    getPatientMainTreatmentFormDataFail,




    // create 
    patientMainTreatmentFormCreateRequest,
    patientMainTreatmentFormCreateSuccess,
    patientMainTreatmentFormCreateFail,


    // edit
    editPatientMainTreatmentFormRequest,
    editPatientMainTreatmentFormSuccess,
    editPatientMainTreatmentFormFail,

    //clear 
    patientMainTreatmentFormClearMsg

} = actions;

export default reducer;
