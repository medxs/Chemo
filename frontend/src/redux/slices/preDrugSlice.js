import { createSlice } from "@reduxjs/toolkit";

const preDrugSlice = createSlice({
    name: 'preDrug',
    initialState: {
        preDrugs: [],
        preSingleDrug: {},
        isLoading: false,
        error: null,
        isDrugUpdated: false,
        isDrugDeleted: false,
        message: null,

        isPreAddSuccessMsg: null,
        isPreAddErrorMsg: null,

        isPreReadSuccessMsg: null,
        isPreReadErrorMsg: null,

        isPreUpdateSuccessMsg: null,
        isPreUpdateErrorMsg: null,

        isPreDeleteSuccessMsg: null,
        isPreDeleteErrorMsg: null,
        preDrugsCount: 0,

    },
    reducers: {
        // =============== Premedication Operations =============
        // Add Premedication Drug or Create Premedication drug Record 
        addPreDrugRequest(state, action) {
            return {
                ...state,
                isLoading: true,
            };
        },
        addPreDrugSuccess(state, action) {
            return {
                ...state,
                isLoading: false,
                error: null,
                isPreAddSuccessMsg: action.payload
            };
        },
        addPreDrugFail(state, action) {
            return {
                ...state,
                isLoading: false,
                isPreAddErrorMsg: action.payload,
                isPreAddSuccessMsg: action.payload
            };
        },



        // Read Premedication Drug Record 
        readPreDrugRequest(state, action) {
            return {
                ...state,
                isLoading: true,
            };
        },
        readPreDrugSuccess(state, action) {
            return {
                ...state,
                preDrugs: action.payload?.data,
                preDrugsCount: action.payload?.count,
                isLoading: false,
                error: null,
            };
        },
        readPreDrugFail(state, action) {
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        },

        // Update Premedication Drug Record 
        updatePreDrugRequest(state, action) {
            return {
                ...state,
                isLoading: true,
            };
        },
        updatePreDrugSuccess(state, action) {
            return {
                ...state,
                isDrugUpdated: true,
                isLoading: false,
                isPreUpdateSuccessMsg: action.payload,
            };
        },
        updatePreDrugFail(state, action) {
            return {
                ...state,
                isLoading: false,
                isPreUpdateSuccessMsg: action.payload,
                isPreUpdateErrorMsg: action.payload,
            };
        },

        // delete Premedication Drug Record 
        deletePreDrugRequest(state, action) {
            return {
                ...state,
                isLoading: true,
            };
        },
        deletePreDrugSuccess(state, action) {
            return {
                ...state,
                isLoading: false,
                isPreDeleteErrorMsg: null,
                isPreDeleteSuccessMsg: action.payload
            };
        },
        deletePreDrugFail(state, action) {
            return {
                ...state,
                isLoading: false,
                isPreDeleteErrorMsg: action.payload,
                isPreDeleteSuccessMsg: action.payload

            };
        },
        premedicationClearMessages(state) {
            return {
                ...state,
                isPreUpdateErrorMsg: null,
                isPreUpdateSuccessMsg: null,

                isPreAddSuccessMsg: null,
                isPreAddErrorMsg: null,

                isPreReadSuccessMsg: null,
                isPreReadErrorMsg: null,

                isPreDeleteSuccessMsg: null,
                isPreDeleteErrorMsg: null,
            }
        }
    }
})


const { actions, reducer } = preDrugSlice;

export const {
    // premedication drug oprations 
    addPreDrugRequest,
    addPreDrugSuccess,
    addPreDrugFail,

    readPreDrugRequest,
    readPreDrugSuccess,
    readPreDrugFail,

    updatePreDrugRequest,
    updatePreDrugSuccess,
    updatePreDrugFail,

    deletePreDrugRequest,
    deletePreDrugSuccess,
    deletePreDrugFail,

    premedicationClearMessages,

} = actions

export default reducer;