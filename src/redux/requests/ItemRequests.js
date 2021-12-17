import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { tokenConfig } from "./AuthRequests";

// get all items
export const getItems = createAsyncThunk(
    'items/getItems',
    async (_, { rejectWithValue, getState }) => {
        try {
            const res = await axios.get('/api/items', tokenConfig(getState));
            return res.data;
        } catch (err) {
            return rejectWithValue({
                data: err.response.data,
                status: err.response.status,
            });
        }
    }
);


// add new item
export const addItem = createAsyncThunk(
    'items/addItem',
    async (new_item, { rejectWithValue, getState }) => {
        try {
            const res = await axios.post('/api/items', new_item, tokenConfig(getState));
            return res.data;
        } catch (err) {
            return rejectWithValue({
                data: err.response.data,
                status: err.response.status,
            });
        }
    }
);


// TODO: update item request


// delete an item
export const deleteItem = createAsyncThunk(
    'items/deleteItem',
    async ({ id }, { rejectWithValue, getState }) => {
        try {
            await axios.delete(`/api/items/${id}`, tokenConfig(getState));
            return { id };
        } catch (err) {
            return rejectWithValue({
                data: err.response.data,
                status: err.response.status,
            });
        }
    }
);



// set the checked state of an item
export const checkItem = createAsyncThunk(
    'items/checkItem',
    async ({ id, isChecked }, { rejectWithValue, getState }) => {
        try {
            await axios.patch(`/api/items/${id}`, { isChecked }, tokenConfig(getState));
            return { id };
        } catch (err) {
            return rejectWithValue({
                data: err.response.data,
                status: err.response.status,
            });
        }
    }
)