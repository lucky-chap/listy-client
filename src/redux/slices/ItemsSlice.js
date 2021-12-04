import { createSlice } from "@reduxjs/toolkit";

import {
    getItems,
    deleteItem,
    checkItem,
    addItem,
} from '../requests/ItemRequests';

const initialState = {
    itemsList: [],
    loadItemsList: null,
};


const itemsSlice = createSlice({
    name: 'items',
    initialState,
    extraReducers: {
        [getItems.fulfilled]: (state, { payload }) => {
            state.itemsList = payload;
            state.loadItemsList = 'success';
        },
        [deleteItem.fulfilled]: (state, { payload }) => {
            state.itemsList.filter(item => item._id !== payload.id);
        },
        [checkItem.fulfilled]: (state, { payload }) => {
            state.itemsList = (
                state.itemsList.map(item => {
                    if (item._id === payload.id) {
                        item.isChecked = !item.isChecked;
                    }
                    return { ...item };
                })
            );
        },
        [addItem.fulfilled]: (state, { payload }) => {
            state.itemsList = [{ title: payload.title, isChecked: false, _id: payload._id, content: payload.content }, ...state.itemsList];
        },
    }
});


// Reducer
export default itemsSlice.reducer;