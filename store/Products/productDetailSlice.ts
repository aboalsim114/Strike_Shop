import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProductById } from './productAsync';
import { Product } from '../types';

interface ProductState {
    product: Product | null;
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    product: null,
    loading: false,
    error: null,
};

const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    reducers: {
        resetProductState: (state) => {
            state.product = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetProductState } = productDetailSlice.actions;

export default productDetailSlice.reducer;
