import { combineReducers } from 'redux';
import authReducer from './authReducer';

// Exporting The RootReducer
export default combineReducers({
    auth: authReducer
});