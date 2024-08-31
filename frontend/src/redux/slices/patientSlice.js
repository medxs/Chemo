import { createSlice } from "@reduxjs/toolkit";


const patientSlice = createSlice({
    name: 'patient',
    initialState: {
        loading: false,
        patient: [],
        patientErrorMsg: null,
        patientSuccessMsg: null,
    },
    reducers: {

        // Create patients request
        patientCreateRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        patientCreateSuccess(state, action) {
            console.log("patient Create Success:", action.payload?.message);
            return {
                ...state,
                loading: false,
                patientSuccessMsg: action.payload?.message,
            }
        },
        patientCreateFail(state, action) {
            console.log("patient Create fail:", action.payload?.message);
            return {
                ...state,
                loading: false,
                patientErrorMsg: action.payload?.message,
                patientSuccessMsg: action.payload?.message,
            }
        },


        /* Read single patient */
        patientRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        patientSuccess(state, action) {
            return {
                ...state,
                loading: false,
                patient: action.payload,
                patientSuccessMsg: action.payload,
                patientErrorMsg: null
            }
        },
        patientFail(state, action) {
            return {
                ...state,
                loading: false,
                patientErrorMsg: action.payload,
                patientSuccessMsg: action.payload,
            }
        },



        /* update patient */
        patientUpdateRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        patientUpdateSuccess(state, action) {
            return {
                ...state,
                patientSuccessMsg: action.payload,
                patientErrorMsg: null
            }
        },
        patientUpdateFail(state, action) {
            return {
                ...state,
                loading: false,
                patientSuccessMsg: action.payload,
                patientErrorMsg: action.payload,
            }
        },

        /* Delete patient */
        patientDeleteRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        patientDeleteSuccess(state, action) {
            return {
                ...state,
                patientSuccessMsg: action.payload,
                patientErrorMsg: null,
            }
        },
        patientDeleteFail(state, action) {
            return {
                ...state,
                loading: false,
                patientSuccessMsg: action.payload,
                patientErrorMsg: action.payload,
            }
        },

        patientClearMessage(state) {
            return {
                ...state,
                patientSuccessMsg: null,
                patientErrorMsg: null,
            }
        }
    }
});

const { actions, reducer } = patientSlice;

export const {

    /* Create single patient */
    patientCreateRequest,
    patientCreateSuccess,
    patientCreateFail,

    /* Read single patient */
    patientRequest,
    patientFail,
    patientSuccess,

    /* update patient */
    patientUpdateRequest,
    patientUpdateFail,
    patientUpdateSuccess,

    /* delete patient */
    patientDeleteRequest,
    patientDeleteFail,
    patientDeleteSuccess,

    // clear msg
    patientClearMessage

} = actions

export default reducer;