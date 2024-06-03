import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, logoutApi } from './authApi';

export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await loginApi(username, password);
            return response;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (refreshToken: string, { rejectWithValue }) => {
        try {
            await logoutApi(refreshToken);
            return;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);
