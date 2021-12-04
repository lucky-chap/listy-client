import { createAsyncThunk } from '@reduxjs/toolkit';

import { getErrors, clearErrors } from '../slices/ErrorSlice';

// Return all errors
export const returnErrors = createAsyncThunk(
    'error/returnErrors',
    async ({ msg, status, id = null }, { dispatch }) => {
        dispatch(getErrors({ msg, status, id }));
        return;
    }
);

// Clear all errors
export const clearErrors = createAsyncThunk(
    'error/clearErrors',
    async ({ dispatch }) => {
        dispatch(clearErrors);
        return;
    }
)