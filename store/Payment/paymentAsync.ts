import { createAsyncThunk } from '@reduxjs/toolkit';
import { createPaymentIntentApi } from './paymentApi';

interface PaymentIntentParams {
    amount: number;
    token: string;
    paymentMethodId: string;
    currency: string;
}

export const createPaymentIntent = createAsyncThunk<string, PaymentIntentParams, { rejectValue: string }>(
    'payment/createPaymentIntent',
    async ({ amount, token, paymentMethodId, currency }, { rejectWithValue }) => {
        try {
            const clientSecret = await createPaymentIntentApi(amount, token, paymentMethodId, currency);
            return clientSecret;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
