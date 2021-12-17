import { createSlice } from "@reduxjs/toolkit";

import { loadUser, registerUser, loginUser } from "../requests/AuthRequests";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {
        // For loading the user
        [loadUser.pending]: (state, action) => {
            state.isLoading = true;
        },
        [loadUser.rejected]: (state, action) => {
            state.isLoading = false;
        },
        [loadUser.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = payload.user;
        },
        // For registration
        [registerUser.rejected]: (state, action) => {
            localStorage.removeItem('token');
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = payload.user;
            state.token = payload.token;
            // set token in localStorage
            localStorage.setItem('token', payload.token);
        },
        // For logging in a user
        [loginUser.rejected]: (state, action) => {
            // remove token from localStorage
            localStorage.removeItem('token');
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            // set token in localStorage
            localStorage.setItem('token', action.payload.token);
        }
    },
    reducers: {
        authError: (state, action) => {
            localStorage.removeItem('token');
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
        },
        logout: (state, action) => {
            localStorage.removeItem('token');
            state.token = null;
            state.user = null;
            state.isAuthenticated = null;
            state.isLoading = false;
        },
    }
});


// Actions
export const { logout } = authSlice.actions;
// Reducer
export default authSlice.reducer;