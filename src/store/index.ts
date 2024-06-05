import { configureStore } from '@reduxjs/toolkit';
import { eventsReducer } from './calendar';
import salaryTableReducer from './salaryTable';
import correctionTableReducer from './correctionTable';

export const store = configureStore({
  reducer: {
    calendar: eventsReducer,
    salaryTable: salaryTableReducer,
    correctionTable: correctionTableReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
