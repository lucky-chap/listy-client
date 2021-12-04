import { createSlice } from "@reduxjs/toolkit";

import { loadUser, registerUser, loginUser } from '../requests/AuthRequests'

import {
	getItems,
	addItem,
	deleteItem,
	checkItem,
} from '../requests/ItemRequests'


const initialState = {
    msg: {},
    status: null,
    id: null
}

const errorSlice = createSlice({
    name: 'error',
    initialState,
    extraReducers: {
        [loadUser.rejected]: (state, { payload }) => {
            state.msg = payload.data.msg
            state.status = payload.status
            state.id = null
        },
        [registerUser.rejected]: (state, { payload }) => {
            state.msg = payload.data.msg
            state.status = payload.status
            state.id = payload.id
        },
        [loginUser.rejected]: (state, { payload }) => {
            state.msg = payload.data.msg
            state.status = payload.status
            state.id = payload.id
        },

        [getItems.rejected]: (state, { payload }) => {
            state.msg = payload.data.msg
            state.status = payload.status
            state.id = payload.id
        },
        [addItem.rejected]: (state, { payload }) => {
            state.msg = payload.data.msg
            state.status = payload.status
            state.id = payload.id
        },
        [deleteItem.rejected]: (state, { payload }) => {
            state.msg = payload.data.msg
            state.status = payload.status
            state.id = payload.id
        },
        [checkItem.rejected]: (state, { payload }) => {
            state.msg = payload.data.msg
            state.status = payload.status
            state.id = payload.id
        },
    },
    reducers: {
        clearErrors: (state, { payload }) => {
            state.msg = {};
            state.id = null;
            state.status = null;
        },
        getErrors: (state, { payload }) => {
            state.msg = payload.data.msg;
            state.status = payload.data.status;
            state.id = payload.id;
        }
    }
});

// Actions
export const { clearErrors, getErrors } = errorSlice.actions;

// Reducer
export default errorSlice.reducer;