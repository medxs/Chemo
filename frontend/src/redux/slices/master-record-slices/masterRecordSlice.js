import { createSlice } from "@reduxjs/toolkit";

const masterRecordSlice = createSlice({
    name: 'masterRecord',
    initialState: {
        loading: false,
        message: null,
        errMessage: null,
        status: null
    },
    reducers: {
        masterRecordCreateRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        masterRecordCreateSuccess(state, action) {
            return {
                ...state,
                loading: false,
                message: action.payload,
                status: "success"
            }
        },
        masterRecordCreateFail(state, action) {
            return {
                ...state,
                loading: false,
                message: action.payload,
                errMessage: action.payload,
                status: "error"
            }
        },

        clearMasterMessage(state, action) {
            return {
                ...state,
                loading: false,
                message: null,
                errMessage: null,
            }
        }
    }
});

const { actions, reducer } = masterRecordSlice;

export const { masterRecordCreateRequest, masterRecordCreateFail, masterRecordCreateSuccess, clearMasterMessage } = actions

export default reducer;