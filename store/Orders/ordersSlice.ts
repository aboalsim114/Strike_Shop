import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserOrders } from './ordersAsync';

interface OrdersState {
    ongoingOrders: any[];
    pastOrders: any[];
    loading: boolean;
    error: string | null;
}

const initialState: OrdersState = {
    ongoingOrders: [],
    pastOrders: [],
    loading: false,
    error: null,
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserOrders.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.ongoingOrders = action.payload.ongoing_orders;
                state.pastOrders = action.payload.past_orders;
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default ordersSlice.reducer;
