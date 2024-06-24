// src/features/auth/profileSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserProfile } from '../authAsync';
import { User } from '../../types';

interface ProfileState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: ProfileState = {
    user: null,
    loading: false,
    error: null,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        resetProfileState: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload; // Correction ici
                console.log('User profile updated in state:', state.user); // Log state update
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                console.error('Profile fetch error:', action.payload);
            });
    },
});

export const { resetProfileState } = profileSlice.actions;

export default profileSlice.reducer;
