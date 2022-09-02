import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const adapter = createEntityAdapter();
const initialState = adapter.getInitialState();

export const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    addRecords: adapter.addMany,
    addRecord: adapter.addOne,
    updateRecord(state, { payload }) {
      adapter.updateOne(state, { id: payload.id, changes: payload });
    },
    updateRecords(state, { payload }) {
      adapter.updateMany(state, { payload });
    },
    removeRecord: adapter.removeOne,
  },
});

export const selectors = adapter.getSelectors((state) => state.records);
export const { actions } = recordsSlice;
export default recordsSlice.reducer;
