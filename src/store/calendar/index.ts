import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

export interface Event {
  id: string;
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
    try {
      const userId = sessionStorage.getItem('id');
      if (!userId) {
        console.error('No ID found in sessionStorage');
        return [];
      }

      const eventCollectionRef = collection(
        firestore,
        'User',
        userId,
        'events',
      );
      const eventSnapshot = await getDocs(eventCollectionRef);

      const events = eventSnapshot.docs.map(
        (document) => ({ id: document.id, ...document.data() }) as Event,
      );
      return events;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },
);

export const addEvent = createAsyncThunk(
  'events/addEvent',
  async (newEvent: Omit<Event, 'id'>) => {
    const userId = sessionStorage.getItem('id');
    if (!userId) throw new Error('No ID found in sessionStorage');

    const docRef = await addDoc(
      collection(firestore, 'User', userId, 'events'),
      newEvent,
    );
    return { id: docRef.id, ...newEvent };
  },
);

export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async (updatedEvent: Event) => {
    const userId = sessionStorage.getItem('id');
    if (!userId) throw new Error('No ID found in sessionStorage');
    if (!updatedEvent.id) throw new Error('Event ID is required');

    const eventDocRef = doc(
      firestore,
      'User',
      userId,
      'events',
      updatedEvent.id,
    );

    // Firestore 업데이트를 위해 인덱스 시그니처를 추가합니다.
    const updateData = {
      name: updatedEvent.name,
      startDate: updatedEvent.startDate,
      endDate: updatedEvent.endDate,
      color: updatedEvent.color,
    };

    await updateDoc(eventDocRef, updateData);
    return updatedEvent;
  },
);

export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async (eventId: string) => {
    const userId = sessionStorage.getItem('id');
    console.log(eventId);
    if (!userId) throw new Error('No ID found in sessionStorage');
    const eventDocRef = doc(firestore, 'User', userId, 'events', eventId);
    await deleteDoc(eventDocRef);
    return eventId;
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
      })
      .addCase(updateEvent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        state.status = 'succeeded';
        const index = state.events.findIndex(
          (event) => event.id === action.payload.id,
        );
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        deleteEvent.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = 'succeeded';
          state.events = state.events.filter(
            (event) => event.id !== action.payload,
          );
        },
      )
      .addCase(deleteEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const eventsReducer = eventsSlice.reducer;
