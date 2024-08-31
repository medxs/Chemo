import { createSlice } from "@reduxjs/toolkit";

const todayCasesTreatmentSlice = createSlice({
    name: 'todayCasesPatientsList',
    initialState: {
        isLoading: false,
        error: null,
        todayCasesPatitentsList: [],
        todayCasesPatitentsCount: null,
    },
    reducers: {
        getTodayCasesRequest(state, action) {
            return {
                ...state,
                isLoading: true
            }
        },
        getTodayCasesSuccess(state, action) {
            return {
                ...state,
                isLoading: false,
                todayCasesPatitentsList: action.payload?.todayCasesProfile,
                todayCasesPatitentsCount: action.payload?.todayCasesProfileCounts,
                error: null
            }
        },
        getTodayCasesFail(state, action) {
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        }
    }
});

const { actions, reducer } = todayCasesTreatmentSlice;

export const { getTodayCasesRequest, getTodayCasesSuccess, getTodayCasesFail } = actions

export default reducer;