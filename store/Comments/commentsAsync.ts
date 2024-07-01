// src/store/Reviews/reviewAsync.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchReviewsApi } from './commentsApi';
import { Review } from '../types';

export const fetchProductReviews = createAsyncThunk<Review[], string, { rejectValue: string }>(
    'reviews/fetchProductReviews',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await fetchReviewsApi(productId);
            return response;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);
