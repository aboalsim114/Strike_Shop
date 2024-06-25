import { combineReducers } from 'redux';
import authReducer from './Auth/AuthSlices/login';
import registerReducer from './Auth/AuthSlices/register'
import profileReducer from './Auth/AuthSlices/profileSlice'
import categoriesReducer from './Category/Slices/categorySlice'
const rootReducer = combineReducers({
    auth: authReducer,
    register: registerReducer,
    profile: profileReducer,
    categories: categoriesReducer,

});

export default rootReducer;
