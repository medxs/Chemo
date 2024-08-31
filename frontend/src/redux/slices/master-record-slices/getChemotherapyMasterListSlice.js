import { createSlice } from "@reduxjs/toolkit";

const getChemotherapyMasterListSlice = createSlice({
    name: 'chemotherapyMasterList',
    initialState: {
        loading: false,
        chemotherapyData: [],
        status: null
    },
    reducers: {
        getChemotherapyMasterListRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getChemotherapyMasterListSuccess(state, action) {
            return {
                ...state,
                loading: false,
                chemotherapyData: action.payload.chemotherapyData,
                status: "success"
            }
        },
        getChemotherapyMasterListFail(state, action) {
            return {
                ...state,
                loading: false,
                status: "error"
            }
        },
        clearChemotherapyDataMasterList(state, action) {
            return {
                ...state,
                loading: false,
                chemotherapyData: []
            }
        }

    }
});

const { actions, reducer } = getChemotherapyMasterListSlice;

export const {
    getChemotherapyMasterListRequest,
    getChemotherapyMasterListSuccess,
    getChemotherapyMasterListFail,
    clearChemotherapyDataMasterList,
} = actions

export default reducer;