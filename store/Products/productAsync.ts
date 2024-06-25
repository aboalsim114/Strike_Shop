import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProductsApi } from '../Products/productApi';
import { Product } from '../types';

export const fetchProducts = createAsyncThunk<Product[]>('products/fetchProducts', async (_, { rejectWithValue }) => {
    try {
        return await getProductsApi();
    } catch (err: any) {
        return rejectWithValue(err.message);
    }
});
