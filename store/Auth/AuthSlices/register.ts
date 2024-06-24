import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { register } from '../authAsync';
import { RootState } from '../../store';

interface RegisterState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string | null;
}

const initialState: RegisterState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: null,
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        resetRegisterState: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.errorMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.errorMessage = null;
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<{ user: any; tokens: { access: string; refresh: string } }>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.errorMessage = null;
            })
            .addCase(register.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.errorMessage = action.payload;
            });
    },
});

export const { resetRegisterState } = registerSlice.actions;


export default registerSlice.reducer;
