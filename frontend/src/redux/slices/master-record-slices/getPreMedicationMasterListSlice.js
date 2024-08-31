import { createSlice } from "@reduxjs/toolkit";

const getPreMedicationListSlice = createSlice({
    name: 'premedicationMasterList',
    initialState: {
        loading: false,
        preMedicationData: [],
        status: null
    },
    reducers: {
        getPremedicationMasterListRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getPremedicationMasterListSuccess(state, action) {
            return {
                ...state,
                loading: false,
                preMedicationData: action.payload.preMedicationData,
                status: "success"
            }
        },
        getPremedicationMasterListFail(state, action) {
            return {
                ...state,
                loading: false,
                status: "error"
            }
        },

        clearPremedicationDataMasterList(state, action) {
            return {
                ...state,
                loading: false,
                preMedicationData: []
            }
        }
    }
});

const { actions, reducer } = getPreMedicationListSlice;

export const {
    getPremedicationMasterListRequest,
    getPremedicationMasterListSuccess,
    getPremedicationMasterListFail,
    clearPremedicationDataMasterList
} = actions

export default reducer;