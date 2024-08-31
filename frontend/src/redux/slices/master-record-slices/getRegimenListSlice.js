import { createSlice } from "@reduxjs/toolkit";

const getRegimenListSlice = createSlice({
    name: 'regimenList',
    initialState: {
        loading: false,
        regimenList: [],
        status: null
    },
    reducers: {
        getRegimenListRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getRegimenListSuccess(state, action) {
            return {
                ...state,
                loading: false,
                regimenList: action.payload.regimenData,
                status: "success"
            }
        },
        getRegimenListFail(state, action) {
            return {
                ...state,
                loading: false,
                status: "error"
            }
        }
    }
});

const { actions, reducer } = getRegimenListSlice;

export const { getRegimenListRequest, getRegimenListSuccess, getRegimenListFail } = actions

export default reducer;