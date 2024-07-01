import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, logoutApi, registerApi, getProfileApi, updateProfileApi } from './authApi';
import {User} from '../types'

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




export const register = createAsyncThunk(
    'auth/register',
    async (userData: User, { rejectWithValue }) => {
        try {
            const response = await registerApi(userData);
            return response;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);





export const fetchUserProfile = createAsyncThunk<User, string, { rejectValue: string }>(
    'auth/fetchUserProfile',
    async (token, { rejectWithValue }) => {
        try {
            const response = await getProfileApi(token);
            return response;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);






export const updateUserProfile = createAsyncThunk<User, { token: string; userData: Partial<User> }, { rejectValue: string }>(
    'auth/updateUserProfile',
    async ({ token, userData }, { rejectWithValue }) => {
        try {
            const response = await updateProfileApi(token, userData);
            return response;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);
