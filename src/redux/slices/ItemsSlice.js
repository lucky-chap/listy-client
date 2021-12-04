import { createSlice } from "@reduxjs/toolkit";

import {
    getItems,
    deleteItem,
    checkItem,
    addItem,
} from '../requests/ItemRequests';

const initialState = {
    items: [],
    loadItems: null,
};


const itemsSlice = createSlice({
    name: 'items',
    initialState,
    extraReducers: {
        [getItems.fulfilled]: (state, { payload }) => {
            state.items = payload;
            state.loadItems = 'success';
        },
        [deleteItem.fulfilled]: (state, { payload }) => {
            state.items.filter(item => item._id !== payload.id);
        },
        [checkItem.fulfilled]: (state, { payload }) => {
            state.items = (
                state.items.map(item => {
                    if (item._id === payload.id) {
                        item.isChecked = !item.isChecked;
                    }
                    return { ...item };
                })
            );
        },
        [addItem.fulfilled]: (state, { payload }) => {
            state.items = [{ title: payload.title, isChecked: false, _id: payload._id, content: payload.content }, ...state.items];
        },
    }
});


// Reducer
export default itemsSlice.reducer;