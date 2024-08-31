import { createSlice } from "@reduxjs/toolkit";

const getTakeHomeMasterListSlice = createSlice({
    name: 'takeHomeMasterList',
    initialState: {
        loading: false,
        takeHomeData: [],
        status: null
    },
    reducers: {
        getTakeHomeMasterListRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getTakeHomeMasterListSuccess(state, action) {
            return {
                ...state,
                loading: false,
                takeHomeData: action.payload.takeHomeData,
                status: "success"
            }
        },
        getTakeHomeMasterListFail(state, action) {
            return {
                ...state,
                loading: false,
                status: "error"
            }
        },
        clearTakeHomeDataMasterList(state, action) {
            return {
                ...state,
                loading: false,
                takeHomeData: []
            }
        }
    }
});

const { actions, reducer } = getTakeHomeMasterListSlice;

export const {
    getTakeHomeMasterListRequest,
    getTakeHomeMasterListSuccess,
    getTakeHomeMasterListFail,
    clearTakeHomeDataMasterList
} = actions

export default reducer;