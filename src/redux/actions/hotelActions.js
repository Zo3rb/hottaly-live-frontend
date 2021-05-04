import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = "YOUR_API_LINK";

export const createHotel = (token, data) => async () => {
    try {
        const response = await axios.post(`${API_URL}/create-hotel`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        toast.success(response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
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

export const fetchAllHotels = async (query = {}) => {
    try {

        let parsedQuery = Object.keys(query).map(key => key + '=' + query[key]).join('&');
        const response = await axios.get(`${API_URL}/hotels/?${parsedQuery}`);
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

export const fetchSingleHotel = async id => {
    try {

        const response = await axios.get(`${API_URL}/hotel/${id}`);
        return response.data.hotel;

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

export const fetchUserHotels = async token => {
    try {

        const response = await axios.get(`${API_URL}/hotels/my`, {
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

export const updateHotel = (token, data, id) => async () => {
    try {
        const response = await axios.post(`${API_URL}/hotel/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        toast.success(response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
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

export const deleteHotel = async (token, id, callback) => {
    try {

        const response = await axios.delete(`${API_URL}/hotel/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        toast.success(response.data, {
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
};
