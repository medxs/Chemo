import { createSlice } from "@reduxjs/toolkit";

const chemoDrugSlice = createSlice({
    name: 'chemoDrug',
    initialState: {

        chemoDrugs: [],
        takeHomeSingleDrug: {},
        isLoading: false,
        error: null,
        chemoDrugsCount: 0,
        isChemoAddSuccessMsg: null,
        isChemoAddErrorMsg: null,

        isChemoReadSuccessMsg: null,
        isChemoReadErrorMsg: null,

        isChemoUpdateSuccessMsg: null,
        isChemoUpdateErrorMsg: null,

        isChemoDeleteSuccessMsg: null,
        isChemoDeleteErrorMsg: null,

    },

    reducers: {
        addChemoDrugRequest(state, action) {
            return {
                ...state,
                isLoading: true,
            };
        },
        addChemoDrugSuccess(state, action) {
            return {
                ...state,
                isChemoAddSuccessMsg: action.payload,
                isLoading: false,
                error: null
            };
        },
        addChemoDrugFail(state, action) {
            return {
                ...state,
                isLoading: false,
                isChemoAddErrorMsg: action.payload,
                isChemoAddSuccessMsg: action.payload,

            };
        },


        // Read take home Drug Record 
        readChemoDrugRequest(state, action) {
            return {
                ...state,
                isLoading: true,
            };
        },
        readChemoDrugSuccess(state, action) {

            console.log("Action Chemo Drug:", action.payload);
            return {
                ...state,
                chemoDrugs: action.payload?.data,
                chemoDrugsCount: action.payload?.count,
                isLoading: false,
                error: null
            };
        },
        readChemoDrugFail(state, action) {
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        },

        // Update Take Home Drug Record 
        updateChemoDrugRequest(state, action) {
            return {
                ...state,
                isLoading: true,
            };
        },
        updateChemoDrugSuccess(state, action) {
            return {
                ...state,
                isDrugUpdated: true,
                isLoading: false,
                isChemoUpdateSuccessMsg: action.payload,
                isChemoUpdateErrorMsg: null,
            };
        },
        updateChemoDrugFail(state, action) {
            console.log("updateChemoDrugFail", action.payload);
            return {
                ...state,
                isLoading: false,
                isChemoUpdateErrorMsg: action.payload,
                isChemoUpdateSuccessMsg: action.payload,

            };
        },

        // delete Take Home   Drug Record 
        deleteChemoDrugRequest(state, action) {
            return {
                ...state,
                isLoading: true,
            };
        },
        deleteChemoDrugSuccess(state, action) {
            return {
                ...state,
                isDrugDeleted: true,
                isLoading: false,
                isChemoDeleteSuccessMsg: action.payload,
                isChemoDeleteErrorMsg: null,
            };
        },
        deleteChemoDrugFail(state, action) {
            return {
                ...state,
                isLoading: false,
                isChemoDeleteSuccessMsg: action.payload,
                isChemoDeleteErrorMsg: action.payload,
            };
        },
        chemoClearMessages(state) {
            return {
                ...state,
                isChemoAddSuccessMsg: null,
                isChemoAddErrorMsg: null,

                isChemoReadSuccessMsg: null,
                isChemoReadErrorMsg: null,

                isChemoUpdateSuccessMsg: null,
                isChemoUpdateErrorMsg: null,

                isChemoDeleteSuccessMsg: null,
                isChemoDeleteErrorMsg: null,
            }
        }
    }
})




const { actions, reducer } = chemoDrugSlice;

export const {

    // Take Home drug  operations 
    addChemoDrugRequest,
    addChemoDrugSuccess,
    addChemoDrugFail,

    readChemoDrugRequest,
    readChemoDrugSuccess,
    readChemoDrugFail,

    updateChemoDrugRequest,
    updateChemoDrugSuccess,
    updateChemoDrugFail,

    deleteChemoDrugRequest,
    deleteChemoDrugSuccess,
    deleteChemoDrugFail,

    chemoClearMessages

} = actions

export default reducer;
