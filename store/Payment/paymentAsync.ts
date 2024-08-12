import { createAsyncThunk } from '@reduxjs/toolkit';
import { createPaymentIntentApi } from './paymentApi';

export const createPaymentIntent = createAsyncThunk<string, { amount: number, token: string, paymentMethodId: string }, { rejectValue: string }>(
    'payment/createPaymentIntent',
    async ({ amount, token, paymentMethodId }, { rejectWithValue }) => {
        try {
            const clientSecret = await createPaymentIntentApi(amount, token);
            return clientSecret;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
