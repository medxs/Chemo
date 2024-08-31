import { createSlice } from "@reduxjs/toolkit";

const patientsSlice = createSlice({
    name: 'patients',
    initialState: {

        loading: false,
        error: null,

        patients: [],
        patientsCount: null,

    },
    reducers: {

        patientsRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        patientsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                patients: action.payload?.data,
                patientsCount: action.payload.count,

                error: null
            }
        },
        patientsFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }


    }
});

const { actions, reducer } = patientsSlice;

export const { patientsRequest, patientsFail, patientsSuccess } = actions

export default reducer;