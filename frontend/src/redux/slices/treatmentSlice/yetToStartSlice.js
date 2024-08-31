import { createSlice } from "@reduxjs/toolkit";

const yetToStartTreatmentSlice = createSlice({
    name: 'YetToStartTreatment',
    initialState: {
        isLoading: false,
        error: null,
        createdProfilePatitentsList: [],
        createdProfilePatitentsCount: null,
    },
    reducers: {
        getCreatedProfileRequest(state, action) {
            return {
                ...state,
                isLoading: true
            }
        },
        getCreatedProfileSuccess(state, action) {
            return {
                ...state,
                isLoading: false,
                createdProfilePatitentsList: action.payload?.profileCreated,
                createdProfilePatitentsCount: action.payload?.profileCreatedCounts,
                error: null
            }
        },
        getCreatedProfileFail(state, action) {
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        }
    }
});

const { actions, reducer } = yetToStartTreatmentSlice;

export const { getCreatedProfileRequest, getCreatedProfileSuccess, getCreatedProfileFail } = actions

export default reducer;