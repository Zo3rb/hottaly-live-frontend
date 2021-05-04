import { AUTH_LOG_IN, AUTH_LOG_OFF } from '../types';

let userStates;

if (window.localStorage.getItem("auth")) {
    userStates = JSON.parse(window.localStorage.getItem("auth"));
} else {
    userStates = null;
};

const authReducer = (state = userStates, { type, payload }) => {
    switch (type) {
        case AUTH_LOG_IN:
            return state = payload;
        case AUTH_LOG_OFF:
            return payload;
        default:
            return state;
    }
};

export default authReducer;
