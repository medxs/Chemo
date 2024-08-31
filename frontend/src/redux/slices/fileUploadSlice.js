import { createSlice } from "@reduxjs/toolkit";

const fileUploadSlice = createSlice({
    name: "file",
    initialState: {
        isloading: false,
        files: [],
        error: null,
        success: null
    },
    reducers: {
        fileUploadRequest(state, action) {
            return {
                ...state,
                isloading: false
            }
        },
        fileUploadSuccess(state, action) {
            return {
                ...state,
                isloading: false,
                error: false,
                success: action.payload,
            }
        },
        fileUploadFail(state, action) {
            return {
                ...state,
                isloading: false,
                error: action.payload,
                success: action.payload,
            }
        }
    }
});

const { actions, reducer } = fileUploadSlice;

export const {
    fileUploadRequest,
    fileUploadSuccess,
    fileUploadFail
} = actions

export default reducer;