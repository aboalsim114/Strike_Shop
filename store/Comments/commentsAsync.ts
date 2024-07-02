// src/store/Reviews/reviewAsync.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchReviewsApi , addReviewApi} from './commentsApi';
import { Review , AddReviewPayload} from '../types';

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





export const addProductReview = createAsyncThunk<Review, AddReviewPayload, { rejectValue: string }>(
    'reviews/addProductReview',
    async (review, { rejectWithValue }) => {
        try {
            const response = await addReviewApi(review);
            return response;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);