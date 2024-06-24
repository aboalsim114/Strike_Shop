import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, logout } from '../authAsync';

interface AuthState {
    isAuthenticated: boolean;
    user: {
        id: string | null;
        username: string | null;
        email: string | null;
        first_name: string | null;
        last_name: string | null;
        role: 'admin' | 'user' | null;
    } | null;
    tokens: {
        access: string | null;
        refresh: string | null;
    };
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: {
        id: null,
        username: null,
        email: null,
        first_name: null,
        last_name: null,
        role: null,
    },
    tokens: {
        access: null,
        refresh: null,
    },
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetState: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.tokens = {
                access: null,
                refresh: null,
            };
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<{ user: AuthState['user']; tokens: { access: string; refresh: string } }>) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.tokens = action.payload.tokens;
                console.log('token: ', state.tokens);
                console.log("user : ", state.user);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.user = {
                    id: null,
                    username: null,
                    email: null,
                    first_name: null,
                    last_name: null,
                    role: null,
                };
                state.tokens = {
                    access: null,
                    refresh: null,
                };

                console.log('token : ', state.tokens);   
            });
    },
});

export const { resetState } = authSlice.actions;
export default authSlice.reducer;
