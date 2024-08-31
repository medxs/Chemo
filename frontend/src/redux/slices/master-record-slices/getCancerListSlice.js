import { createSlice } from "@reduxjs/toolkit";

const getCancerListSlice = createSlice({
    name: 'cancerList',
    initialState: {
        loading: false,
        cancerList: [],
        regimenList: [],

        status: null
    },
    reducers: {
        getCancerListRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getCancerListSuccess(state, action) {
            return {
                ...state,
                loading: false,
                cancerList: action.payload.cancerData,
                regimenList: action.payload.regimenData,
                status: "success"
            }
        },
        getCancerListFail(state, action) {
            return {
                ...state,
                loading: false,
                status: "error"
            }
        }
    }
});

const { actions, reducer } = getCancerListSlice;

export const { getCancerListRequest, getCancerListSuccess, getCancerListFail } = actions

export default reducer;