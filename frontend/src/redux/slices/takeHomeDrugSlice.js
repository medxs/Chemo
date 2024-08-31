import { createSlice } from "@reduxjs/toolkit";

const takeHomeDrugSlice = createSlice({
    name: 'takeHomeDrug',
    initialState: {
        takeHomeDrugs: [],
        takeHomeSingleDrug: {},
        isLoading: false,
        takeHomeDrugsCount: 0,
        error: null,

        isDrugUpdated: false,
        isDrugDeleted: false,

        isTakeHomeAddSuccessMsg: null,
        isTakeHomeAddErrorMsg: null,

        isTakeHomeReadSuccessMsg: null,
        isTakeHomeReadErrorMsg: null,

        isTakeHomeUpdateSuccessMsg: null,
        isTakeHomeUpdateErrorMsg: null,

        isTakeHomeDeleteSuccessMsg: null,
        isTakeHomeDeleteErrorMsg: null,

    },
    reducers: {

        // =============== Take Home Operations =============
        // Add or Create Take Home Drug drug Record 
        addTakeHomeDrugRequest(state, action) {
            return {
                ...state,
                isLoading: true,
            };
        },
        addTakeHomeDrugSuccess(state, action) {
            console.log(" action.payload Take Home:", action.payload);
            return {
                ...state,
                isLoading: false,
                isTakeHomeAddSuccessMsg: action.payload,
                isTakeHomeAddErrorMsg: null
            };
        },
        addTakeHomeDrugFail(state, action) {
            return {
                ...state,
                isLoading: false,
                isTakeHomeAddSuccessMsg: action.payload,
                isTakeHomeAddErrorMsg: action.payload,
            };
        },


        // Read take home Drug Record 
        readTakeHomeDrugRequest(state, action) {
            return {
                ...state,
                isLoading: true,
            };
        },
        readTakeHomeDrugSuccess(state, action) {
            return {
                ...state,
                takeHomeDrugs: action.payload?.data,
                takeHomeDrugsCount: action.payload?.count,
                isLoading: false,
                error: null
            };
        },
        readTakeHomeDrugFail(state, action) {
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        },



        // Update Take Home Drug Record 
        updateTakeHomeDrugRequest(state, action) {
            return {
                ...state,
                isLoading: true,
            };
        },
        updateTakeHomeDrugSuccess(state, action) {
            console.log("updateTakeHomeDrugSuccess:", action.payload);
            return {
                ...state,
                isTakeHomeUpdateSuccessMsg: action.payload,
                isTakeHomeUpdateErrorMsg: null,
                isLoading: false,
            };
        },
        updateTakeHomeDrugFail(state, action) {
            return {
                ...state,
                isLoading: false,
                isTakeHomeUpdateSuccessMsg: action.payload,
                isTakeHomeUpdateErrorMsg: action.payload,
            };
        },



        // delete Take Home   Drug Record 
        deleteTakeHomeDrugRequest(state, action) {
            return {
                ...state,
                isLoading: true,
            };
        },
        deleteTakeHomeDrugSuccess(state, action) {
            return {
                ...state,
                isDrugDeleted: true,
                isLoading: false,
                isTakeHomeDeleteSuccessMsg: action.payload,
                isTakeHomeDeleteErrorMsg: null,
            };
        },
        deleteTakeHomeDrugFail(state, action) {
            return {
                ...state,
                isLoading: false,
                isTakeHomeDeleteSuccessMsg: action.payload,
                isTakeHomeDeleteErrorMsg: action.payload,

            };
        },

        takeHomeClearMessages(state) {
            return {
                ...state,

                isTakeHomeAddSuccessMsg: null,
                isTakeHomeAddErrorMsg: null,

                isTakeHomeReadSuccessMsg: null,
                isTakeHomeReadErrorMsg: null,

                isTakeHomeUpdateSuccessMsg: null,
                isTakeHomeUpdateErrorMsg: null,

                isTakeHomeDeleteSuccessMsg: null,
                isTakeHomeDeleteErrorMsg: null,
            }
        }

    }
})


const { actions, reducer } = takeHomeDrugSlice;

export const {

    // Take Home drug  operations 
    addTakeHomeDrugRequest,
    addTakeHomeDrugSuccess,
    addTakeHomeDrugFail,

    readTakeHomeDrugRequest,
    readTakeHomeDrugSuccess,
    readTakeHomeDrugFail,

    updateTakeHomeDrugRequest,
    updateTakeHomeDrugSuccess,
    updateTakeHomeDrugFail,

    deleteTakeHomeDrugRequest,
    deleteTakeHomeDrugSuccess,
    deleteTakeHomeDrugFail,
    takeHomeClearMessages
} = actions

export default reducer;






