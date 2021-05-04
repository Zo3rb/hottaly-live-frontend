import axios from 'axios';
import { toast } from 'react-toastify';
import { AUTH_LOG_IN, AUTH_LOG_OFF } from '../types';

const API_URL = "YOUR_API_LINK";

export const login = (data, callback) => async dispatch => {
    try {
        const response = await axios.post(`${API_URL}/login`, data);
        window.localStorage.setItem("auth", JSON.stringify(response.data.data));
        dispatch({
            type: AUTH_LOG_IN,
            payload: response.data.data
        });
        toast.success("Welcome, Nice to See You Again", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        callback();
    } catch (error) {
        toast.error(error.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const logout = callback => dispatch => {
    window.localStorage.removeItem("auth");
    try {
        dispatch({
            type: AUTH_LOG_OFF,
            payload: null
        });
        callback();
        toast.success('Hope to See You Again Soon', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } catch (error) {
        toast.error("Something Went Wrong. Please Try Again", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
};
