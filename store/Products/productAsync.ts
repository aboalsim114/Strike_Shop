import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProductsApi, getProductByIdApi } from '../Products/productApi';
import { Product } from '../types';

export const fetchProducts = createAsyncThunk<Product[]>('products/fetchProducts', async (_, { rejectWithValue }) => {
    try {
        return await getProductsApi();
    } catch (err: any) {
        return rejectWithValue(err.message);
    }
});






export const fetchProductById = createAsyncThunk<Product, string>(
    'products/fetchProductById',
    async (productId, { rejectWithValue }) => {
        try {
            return await getProductByIdApi(productId);
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);
