import { createSlice } from "@reduxjs/toolkit";


const dateSlice = createSlice({
    name: 'dateHandler',
    initialState: {
        cycleTestLists: [],
        getSingleCycleTestList: [],
        isloading: false,
        message: null,
        error: null,
    },
    reducers: {

        // get data request form db
        getCycleTestRequest(state, action) {
            return {
                ...state,
                isloading: true,
            }
        },
        getCycleTestSuccess(state, action) {
            return {
                ...state,
                isloading: false,
                error: null,
                cycleTestLists: action.payload,
                getSingleCycleTestList: action.payload,
            }
        },
        getCycleTestFail(state, action) {
            return {
                ...state,
                isloading: false,
                error: action.payload,
                message: action.payload,
            }
        },


        //create or add new data request
        createCycleTestRequest(state, action) {
            return {
                ...state,
                isloading: true,
            }
        },
        createCycleTestSuccess(state, action) {
            // console.log("createCycleTestSuccess:", action.payload);
            return {
                ...state,
                isloading: false,
                error: null,
                message: action.payload,
            }
        },
        createCycleTestFail(state, action) {
            return {
                ...state,
                isloading: false,
                message: action.payload,
                error: action.payload
            }
        },

        deleteSingleDateRequest(state, action) {
            return {
                ...state,
                isloading: false,
                error: null,
            }
        },
        deleteSingleDateSuccess(state, action) {
            return {
                ...state,
                isloading: false,
                error: null,
                message: action.payload?.message,
            }
        },
        deleteSingleDateFail(state, action) {
            console.log("deleteSingleDateFail message:", action.payload);
            return {
                ...state,
                isloading: false,
                message: action.payload,
                error: action.payload,
            }
        },
        dateClearMessage(state, action) {
            return {
                ...state,
                isloading: false,
                message: '',
                error: '',
            }
        }


    }
});

const { actions, reducer } = dateSlice;

export const {


    // get data from db
    getCycleTestRequest,
    getCycleTestSuccess,
    getCycleTestFail,

    // cycle test create 
    createCycleTestRequest,
    createCycleTestSuccess,
    createCycleTestFail,

    // 
    deleteSingleDateRequest,
    deleteSingleDateSuccess,
    deleteSingleDateFail,


    dateClearMessage,

} = actions;

export default reducer;
