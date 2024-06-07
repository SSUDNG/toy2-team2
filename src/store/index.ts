import { configureStore } from '@reduxjs/toolkit';
import { eventsReducer } from './calendar';
import salaryTableReducer from './salaryTable';
import correctionTableReducer from './correctionTable';
import loginReducer from './login';

export const store = configureStore({
  reducer: {
    calendar: eventsReducer,
    salaryTable: salaryTableReducer,
    correctionTable: correctionTableReducer,
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
