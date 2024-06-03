import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

export interface Event {
  id?: string;
  name: string;
  startDate: string;
  endDate: string;
  color: string;
}

interface EventsState {
  events: Event[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  status: 'idle',
  error: null,
};

export const fetchEvents = createAsyncThunk<Event[], void>(
  'events/fetchEvents',
  async () => {
    const querySnapshot = await getDocs(collection(firestore, 'events'));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Event[];
  },
);

export const addEvent = createAsyncThunk(
  'events/addEvent',
  async (newEvent: Event) => {
    const docRef = await addDoc(collection(firestore, 'events'), newEvent);
    return { id: docRef.id, ...newEvent };
  },
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchEvents.fulfilled,
        (state, action: PayloadAction<Event[]>) => {
          state.status = 'succeeded';
          state.events = action.payload;
        },
      )
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addEvent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        state.status = 'succeeded';
        state.events.push(action.payload);
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const eventsReducer = eventsSlice.reducer;
