import { combineReducers } from 'redux';
import authReducer from './Auth/AuthSlices/login';

const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;
