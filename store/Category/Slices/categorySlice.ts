
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCategories } from '../categoryAsync';
import { Category } from '../../types';

interface CategoryState {
    categories: Category[] | null;
    loading: boolean;
    error: string | null;
}

const initialState: CategoryState = {
    categories: null,
    loading: false,
    error: null,
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.loading = false;
                state.categories = action.payload;
                console.log('Categories updated in state:', state.categories);
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default categorySlice.reducer;
