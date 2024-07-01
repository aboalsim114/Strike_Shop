import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCartItems, addProductToCart, deleteCartItem } from './cartAsync';
import { CartState, Cart } from '../types';

const initialState: CartState = {
    items: [],
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCartItems.fulfilled, (state, action: PayloadAction<Cart[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addProductToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProductToCart.fulfilled, (state, action: PayloadAction<Cart>) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteCartItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCartItem.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default cartSlice.reducer;
