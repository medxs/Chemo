import { getAuthToken } from "../../helpers/getAuthToken";
import axios from "axios";
import { loginFail, loginRequest, loginSuccess, registerFail, registerRequest, registerSuccess } from "../slices/authSlice";
import getEnvironmentUrl from "../../helpers/envHelper";


const BASE_URL = getEnvironmentUrl();


export const registerForm = (data) => async (dispatch) => {
    try {
        dispatch(registerRequest())
        const response = await axios.post(`${BASE_URL}/api/register`, data);
        console.log("response ", response?.data);
        dispatch(registerSuccess(response?.data));
    } catch (err) {
        console.log(err?.response?.data);
        dispatch(registerFail(err?.response?.data));
    }
}

export const login = (data) => async (dispatch) => {
    try {
        dispatch(loginRequest())
        const response = await axios.post(`${BASE_URL}/api/login`, data);
        console.log("Jwt response ", response);
        dispatch(loginSuccess(response?.data));
        const parse_res = JSON.parse(response?.request?.response) || {};
        localStorage.setItem("ChemoToken", parse_res?.jwtToken);

    } catch (err) {
        console.log(err?.response?.data);
        dispatch(loginFail(err?.response?.data));
    }
}


export const getUser = () => async (dispatch) => {

    try {
        dispatch(loginRequest())
        const response = await axios.get(`${BASE_URL}/api/get-user`, {
            withCredentials: true,
            headers: {
                Authorization: `${getAuthToken()}`,
            },
        })

        console.log("getUser response:", response);
        dispatch(loginSuccess(response?.data));
    } catch (err) {
        console.log("err?.response?.data:", err?.response?.data);
        dispatch(loginFail(err?.response?.data));
    }
}
