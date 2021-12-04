import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/AuthSlice';
import errorReducer from './slices/ErrorSlice';
import itemsReducer from './slices/ItemsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        items: itemsReducer,
        error: errorReducer
    }
});

export default store;