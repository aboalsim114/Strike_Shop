// paymentAsync.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createPaymentIntentApi } from './paymentApi';

export const createPaymentIntent = createAsyncThunk<string, number, { rejectValue: string }>(
    'payment/createPaymentIntent',
    async (amount, { rejectWithValue }) => {
        try {
            const clientSecret = await createPaymentIntentApi(amount);
            return clientSecret;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
