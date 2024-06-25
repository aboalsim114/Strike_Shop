// src/features/category/categoryAsync.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCategoriesApi } from '../Category/categoryApi';
import { Category } from '../types';


export const fetchCategories = createAsyncThunk<Category[]>(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            return await getCategoriesApi();
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);
