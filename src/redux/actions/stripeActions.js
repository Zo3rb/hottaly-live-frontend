import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = "YOUR_API_LINK";

export const connectUser = token => async () => {
    try {
        const response = await axios.post(`${API_URL}/create-connect-account`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // TODO --> Handle The Response
        window.location.href = response.data;
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
};

export const getStatusAccount = (token, callback) => async dispatch => {
    try {
        const response = await axios.post(`${API_URL}/get-account-status`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Condition to Check Local Storage
        if (window.localStorage.getItem("auth")) {
            let auth = JSON.stringify(response.data);
            window.localStorage.setItem("auth", auth);
        };

        dispatch({
            type: "AUTH_LOG_IN",
            payload: response.data
        });

        // Change The Location to Dashboard
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
};

export const getAccountBalance = token => async () => {
    try {
        const response = await axios.post(`${API_URL}/get-account-balance`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
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
};

export const getPayoutSettingsLink = token => async () => {
    try {
        const response = await axios.post(`${API_URL}/get-payout-settings`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        window.location.href = response.data.url;
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
};
