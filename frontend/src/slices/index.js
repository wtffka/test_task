import { configureStore } from '@reduxjs/toolkit';
import recordsReducer from './recordsSlice.js';
import notifyReducer from './notificationSlice.js';

export default configureStore({
  reducer: {
    records: recordsReducer,
    notify: notifyReducer,
  },
});
