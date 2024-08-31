import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        users: [],
        loading: false,
        error: null,
        successMsg: null,
        isAuthenticated: false,
        userRole: '',
    },
    reducers: {

        registerRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        registerSuccess(state, action) {
            return {
                ...state,
                loading: false,
                error: null,
                successMsg: action.payload.message
            }
        },
        registerFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload.message,
                successMsg: action.payload.message
            }
        },



        loginRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        loginSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload?.user,
                message: action.payload.message,
                userRole: action.payload?.user?.role,
            }
        },
        loginFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload?.message,
                isAuthenticated: false
            }
        },


        registerClearMsg(state, action) {
            return {
                ...state,
                loading: false,
                error: [],
                successMsg: [],

            }
        }
    }
});

const { actions, reducer } = authSlice;

export const {

    registerRequest,
    registerSuccess,
    registerFail,


    loginRequest,
    loginSuccess,
    loginFail,
    registerClearMsg
} = actions;

export default reducer;
