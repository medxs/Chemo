import { createSlice } from "@reduxjs/toolkit";

const preDrugTreatmentSlice = createSlice({
    name: 'preDrugTreatment',
    initialState: {
        preTreatmentDrugHandle: [],
        isLoading: false,
        preTreatmentDrugAddSuccessMsg: null,
        preTreatmentDrugAddErrorMsg: null,

        preTreatmentDrugReadSuccessMsg: null,
        preTreatmentDrugReadErrorMsg: null,

        preTreatmentDrugUpdateSuccessMsg: null,
        preTreatmentDrugUpdateErrorMsg: null,

        preTreatmentDrugDeleteSuccessMsg: null,
        preTreatmentDrugDeleteErrorMsg: null,
    },
    reducers: {


        // add new pre durg records into treatments page 
        addTreatmentPreDrugRequest(state, action) {
            return {
                ...state,
                isLoading: true,
            }
        },
        addTreatmentPreDrugSuccess(state, action) {
            console.log("preTreatmentDrugAddSuccessMsg: action.payload::", action.payload);
            return {
                ...state,
                isLoading: false,
                preTreatmentDrugAddSuccessMsg: action.payload
            }
        },
        addTreatmentPreDrugFail(state, action) {
            return {
                ...state,
                isLoading: false,
                preTreatmentDrugAddErrorMsg: action.payload
            }
        },




        // Get pre durg records into treatments page 
        getTreatmentPreDrugRequest(state, action) {
            return {
                ...state,
                isLoading: true,
            }
        },
        getTreatmentPreDrugSuccess(state, action) {
            console.log("preTreatmentDrug  - Get -  SuccessMsg: action.payload::", action.payload);
            return {
                ...state,
                isLoading: false,
                preTreatmentDrugHandle: action.payload
            }
        },
        getTreatmentPreDrugFail(state, action) {
            return {
                ...state,
                isLoading: false,
                preTreatmentDruggetErrorMsg: action.payload
            }
        },


    }
})


const { actions, reducer } = preDrugTreatmentSlice;

export const {
    // add
    addTreatmentPreDrugRequest,
    addTreatmentPreDrugSuccess,
    addTreatmentPreDrugFail,

    //get
    getTreatmentPreDrugRequest,
    getTreatmentPreDrugSuccess,
    getTreatmentPreDrugFail
} = actions;

export default reducer;
