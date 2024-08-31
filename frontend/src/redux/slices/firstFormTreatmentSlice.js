import { createSlice } from "@reduxjs/toolkit";

const firstFormSlice = createSlice({
    name: "firstForm",
    initialState: {
        isloading: false,
        cycleTest: [],
        errorMsg: null,
        successMsg: null
    },
    reducers: {
        firstFormCreateRequest(state, action) {
            return {
                ...state,
                isloading: false
            }
        },
        firstFormCreateSuccess(state, action) {
            return {
                ...state,
                isloading: false,
                errorMsg: false,
                successMsg: action.payload,
            }
        },
        firstFormCreateFail(state, action) {
            return {
                ...state,
                isloading: false,
                errorMsg: action.payload,
                successMsg: action.payload,
            }
        }
    }
});

const { actions, reducer } = firstFormSlice;

export const {
    firstFormCreateRequest,
    firstFormCreateSuccess,
    firstFormCreateFail
} = actions

export default reducer;