import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCartItemsApi, addProductToCartApi, deleteCartItemApi } from './cartApi';
import { Cart } from '../types';

export const fetchCartItems = createAsyncThunk<Cart[], void, { rejectValue: string }>(
    'cart/fetchCartItems',
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchCartItemsApi();
            return data;
        } catch (error) {
            return rejectWithValue('Failed to fetch cart items');
        }
    }
);

export const addProductToCart = createAsyncThunk<Cart, { user_id: string, product_id: string, quantity?: number }, { rejectValue: string }>(
    'cart/addProductToCart',
    async ({ user_id, product_id, quantity = 1 }, { rejectWithValue }) => {
        try {
            const data = await addProductToCartApi(user_id, product_id, quantity);
            return data;
        } catch (error) {
            return rejectWithValue('Failed to add product to cart');
        }
    }
);








export const deleteCartItem = createAsyncThunk(
    'cart/deleteCartItem',
    async ({ token, itemId }: { token: string; itemId: string }, { rejectWithValue }) => {
        try {
            const response = await deleteCartItemApi(token, itemId);
            return response;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);