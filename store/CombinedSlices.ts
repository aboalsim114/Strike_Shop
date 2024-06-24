import { combineReducers } from 'redux';
import authReducer from './Auth/AuthSlices/login';
import registerReducer from './Auth/AuthSlices/register'
const rootReducer = combineReducers({
    auth: authReducer,
    register: registerReducer,

});

export default rootReducer;
