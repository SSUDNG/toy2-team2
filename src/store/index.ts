import { configureStore } from '@reduxjs/toolkit';
import salaryTableReducer from './salaryTable/salaryTableSlice';

export const store = configureStore({
  reducer: {
    salaryTable: salaryTableReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
