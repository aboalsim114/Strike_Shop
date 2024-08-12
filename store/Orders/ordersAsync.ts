import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserOrdersApi } from './ordersApi';

export const fetchUserOrders = createAsyncThunk<any, { token: string }, { rejectValue: string }>(
    'orders/fetchUserOrders',
    async ({ token }, { rejectWithValue }) => {
        try {
            const orders = await fetchUserOrdersApi(token);
            return orders;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
