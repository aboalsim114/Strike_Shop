import { combineReducers } from 'redux';
import authReducer from './Auth/AuthSlices/login';
import registerReducer from './Auth/AuthSlices/register'
import profileReducer from './Auth/AuthSlices/profileSlice'
import categoriesReducer from './Category/Slices/categorySlice'
import productReducer from './Products/productSlice'
import productDetailReducer from './Products/productDetailSlice'
import cartReducer from './Panier/cartSlice'
const rootReducer = combineReducers({
    auth: authReducer,
    register: registerReducer,
    profile: profileReducer,
    categories: categoriesReducer,
    products: productReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,

});

export default rootReducer;
