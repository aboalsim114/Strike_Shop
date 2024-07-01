// src/store/Reviews/reviewSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProductReviews } from './commentsAsync';
import { Review } from '../types';

interface ReviewState {
    reviews: Review[];
    loading: boolean;
    error: string | null;
}

const initialState: ReviewState = {
    reviews: [],
    loading: false,
    error: null,
};

const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchProductReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default reviewSlice.reducer;
