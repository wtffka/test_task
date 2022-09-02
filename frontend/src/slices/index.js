// @ts-check

import { configureStore } from '@reduxjs/toolkit';
import locationsReducer from './recordsSlice.js';
import notifyReducer from './notificationSlice.js';

export default configureStore({
  reducer: {
    records: locationsReducer,
    notify: notifyReducer,
  },
});
