import { configureStore } from '@reduxjs/toolkit';
import { eventsReducer } from './modules/calendar';

const store = configureStore({
  reducer: {
    calendar: eventsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
