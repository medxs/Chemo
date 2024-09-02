import { createSlice } from "@reduxjs/toolkit";

const masterRecordSlice = createSlice({
    name: 'masterRecord',
    initialState: {
        loading: false,
        message: null,
        errMessage: null,
        status: null,

        isPreAddMasterRecordSuccessMsg: null,
        isPreAddMasterRecordErrorMsg: null,
        isPreDeleteMasterRecordSuccessMsg: null,
        isPreDeleteMasterRecordErrorMsg: null,


        isChemoAddMasterRecordSuccessMsg: null,
        isChemoAddMasterRecordErrorMsg: null,
        isChemoDeleteMasterRecordSuccessMsg: null,
        isChemoDeleteMasterRecordErrorMsg: null,


        isTakeHomeAddMasterRecordSuccessMsg: null,
        isTakeHomeAddMasterRecordErrorMsg: null,
        isTakeHomeDeleteMasterRecordSuccessMsg: null,
        isTakeHomeDeleteMasterRecordErrorMsg: null,



    },
    reducers: {

        // create
        masterRecordCreateRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        masterRecordCreateSuccess(state, action) {
            return {
                ...state,
                loading: false,
                message: action.payload,
                status: "success"
            }
        },
        masterRecordCreateFail(state, action) {
            return {
                ...state,
                loading: false,
                message: action.payload,
                errMessage: action.payload,
                status: "error"
            }
        },



        // add extra data into drug master table
        addPreDrugIntoMasterRecordRequest(state, action) {
            return {
                ...state,
                isLoading: true,
            };
        },
        addPreDrugIntoMasterRecordSuccess(state, action) {
            return {
                ...state,
                isLoading: false,
                isPreAddMasterRecordErrorMsg: null,
                isPreAddMasterRecordSuccessMsg: action.payload
            };
        },
        addPreDrugIntoMasterRecordFail(state, action) {
            return {
                ...state,
                isLoading: false,
                isPreAddMasterRecordErrorMsg: action.payload,
                isPreAddMasterRecordSuccessMsg: action.payload
            };
        },


        // deleteextra data into drug master table
        deletePreDrugIntoMasterRecordRequest(state, action) {
            return {
                ...state,
                isLoading: true,
            };
        },
        deletePreDrugIntoMasterRecordSuccess(state, action) {
            return {
                ...state,
                isLoading: false,
                isPreDeleteMasterRecordErrorMsg: null,
                isPreDeleteMasterRecordSuccessMsg: action.payload
            };
        },
        deletePreDrugIntoMasterRecordFail(state, action) {
            return {
                ...state,
                isLoading: false,
                isPreDeleteMasterRecordErrorMsg: action.payload,
                isPreDeleteMasterRecordSuccessMsg: action.payload

            };
        },


        //  **********************  chemo drug *******************
        // chemo  add extra data into drug master table
        addChemoDrugIntoMasterRecordRequest(state, action) {
            return {
                ...state,
                isLoading: true,
            };
        },
        addChemoDrugIntoMasterRecordSuccess(state, action) {
            return {
                ...state,
                isLoading: false,
                isChemoAddMasterRecordErrorMsg: null,
                isChemoAddMasterRecordSuccessMsg: action.payload
            };
        },
        addChemoDrugIntoMasterRecordFail(state, action) {
            return {
                ...state,
                isLoading: false,
                isChemoAddMasterRecordErrorMsg: action.payload,
                isChemoAddMasterRecordSuccessMsg: action.payload
            };
        },


        // delete extra data into drug master table
        deleteChemoDrugIntoMasterRecordRequest(state, action) {
            return {
                ...state,
                isLoading: true,
            };
        },
        deleteChemoDrugIntoMasterRecordSuccess(state, action) {
            return {
                ...state,
                isLoading: false,
                isChemoDeleteMasterRecordErrorMsg: null,
                isChemoDeleteMasterRecordSuccessMsg: action.payload
            };
        },
        deleteChemoDrugIntoMasterRecordFail(state, action) {
            return {
                ...state,
                isLoading: false,
                isChemoDeleteMasterRecordErrorMsg: action.payload,
                isChemoDeleteMasterRecordSuccessMsg: action.payload

            };
        },


        //  **********************  take home drug *******************
        // chemo  add extra data into drug master table
        addTakeHomeDrugIntoMasterRecordRequest(state, action) {
            return {
                ...state,
                isLoading: true,
            };
        },
        addTakeHomeDrugIntoMasterRecordSuccess(state, action) {
            return {
                ...state,
                isLoading: false,
                isTakeHomeAddMasterRecordErrorMsg: null,
                isTakeHomeAddMasterRecordSuccessMsg: action.payload
            };
        },
        addTakeHomeDrugIntoMasterRecordFail(state, action) {
            return {
                ...state,
                isLoading: false,
                isTakeHomeAddMasterRecordErrorMsg: action.payload,
                isTakeHomeAddMasterRecordSuccessMsg: action.payload
            };
        },


        // delete extra data into drug master table
        deleteTakeHomeDrugIntoMasterRecordRequest(state, action) {
            return {
                ...state,
                isLoading: true,
            };
        },
        deleteTakeHomeDrugIntoMasterRecordSuccess(state, action) {
            return {
                ...state,
                isLoading: false,
                isTakeHomeDeleteMasterRecordErrorMsg: null,
                isTakeHomeDeleteMasterRecordSuccessMsg: action.payload
            };
        },
        deleteTakeHomeDrugIntoMasterRecordFail(state, action) {
            return {
                ...state,
                isLoading: false,
                isTakeHomeDeleteMasterRecordErrorMsg: action.payload,
                isTakeHomeDeleteMasterRecordSuccessMsg: action.payload

            };
        },


        clearMasterMessage(state, action) {
            return {
                ...state,
                loading: false,
                message: null,
                errMessage: null,

                isChemoAddMasterRecordSuccessMsg: null,
                isChemoAddMasterRecordErrorMsg: null,
                isChemoDeleteMasterRecordSuccessMsg: null,
                isChemoDeleteMasterRecordErrorMsg: null,


                isPreAddMasterRecordSuccessMsg: null,
                isPreAddMasterRecordErrorMsg: null,
                isPreDeleteMasterRecordSuccessMsg: null,
                isPreDeleteMasterRecordErrorMsg: null,


                isTakeHomeAddMasterRecordSuccessMsg: null,
                isTakeHomeAddMasterRecordErrorMsg: null,
                isTakeHomeDeleteMasterRecordSuccessMsg: null,
                isTakeHomeDeleteMasterRecordErrorMsg: null,


            }
        }
    }
});

const { actions, reducer } = masterRecordSlice;

export const {
    masterRecordCreateRequest,
    masterRecordCreateFail,
    masterRecordCreateSuccess,

    addPreDrugIntoMasterRecordRequest,
    addPreDrugIntoMasterRecordSuccess,
    addPreDrugIntoMasterRecordFail,

    deletePreDrugIntoMasterRecordRequest,
    deletePreDrugIntoMasterRecordSuccess,
    deletePreDrugIntoMasterRecordFail,


    addChemoDrugIntoMasterRecordRequest,
    addChemoDrugIntoMasterRecordSuccess,
    addChemoDrugIntoMasterRecordFail,

    deleteChemoDrugIntoMasterRecordRequest,
    deleteChemoDrugIntoMasterRecordSuccess,
    deleteChemoDrugIntoMasterRecordFail,



    addTakeHomeDrugIntoMasterRecordRequest,
    addTakeHomeDrugIntoMasterRecordSuccess,
    addTakeHomeDrugIntoMasterRecordFail,

    deleteTakeHomeDrugIntoMasterRecordRequest,
    deleteTakeHomeDrugIntoMasterRecordSuccess,
    deleteTakeHomeDrugIntoMasterRecordFail,

    clearMasterMessage

} = actions

export default reducer;