import { configureStore } from '@reduxjs/toolkit';

import { itemsSlice } from './itemsSlice';
import { filterSlice } from './filterSlice';

const store = configureStore({
  reducer: {
    items: itemsSlice.reducer,
    filter: filterSlice.reducer,
  },
});

export default store;
