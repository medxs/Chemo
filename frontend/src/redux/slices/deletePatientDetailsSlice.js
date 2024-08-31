import { createSlice } from "@reduxjs/toolkit";

const deletePatientProfileAllRecordSlice = createSlice({
    name: 'deletePatientAllRecord',
    initialState: {
        deleteSuccessMsg: null,
        isloading: false,
        deleteErrorMsg: null,
    },
    reducers: {
        deletePatientAllRecordRequest(state, action) {
            return {
                ...state,
                isloading: true
            }
        },
        deletePatientAllRecordSuccess(state, action) {
            return {
                ...state,
                deleteSuccessMsg: action.payload,
                isloading: false,
            }
        },
        deletePatientAllRecordFail(state, action) {
            return {
                ...state,
                isloading: false,
                deleteErrorMsg: "action.payload",
            }
        },

        deleteClearMessage(state, action) {
            return {
                ...state,
                isloading: false,
                deleteErrorMsg: null,
                deleteSuccessMsg: null
            }
        }
    }
})


const { actions, reducer } = deletePatientProfileAllRecordSlice;

export const {

    deleteClearMessage,

    deletePatientAllRecordRequest,

    deletePatientAllRecordSuccess,

    deletePatientAllRecordFail

} = actions;

export default reducer;
