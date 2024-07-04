
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createPaymentIntent } from './paymentAsync';

interface PaymentState {
    clientSecret: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: PaymentState = {
    clientSecret: null,
    loading: false,
    error: null,
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPaymentIntent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPaymentIntent.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.clientSecret = action.payload;
            })
            .addCase(createPaymentIntent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default paymentSlice.reducer;
