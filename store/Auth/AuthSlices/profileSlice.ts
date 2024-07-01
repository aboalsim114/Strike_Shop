import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserProfile, updateUserProfile } from '../authAsync';
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
                state.user = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
                console.log('Updated user:', action.payload)
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                console.log('Error updating user:', state.error);
                
            });
    },
});

export const { resetProfileState } = profileSlice.actions;

export default profileSlice.reducer;
