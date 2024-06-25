import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from './productAsync';
import { Product } from '../types';

interface ProductState {
    products: Product[] | null;
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: null,
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.products = action.payload;
                console.log('Products updated in state:', state.products);
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default productSlice.reducer;
