import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getDocs,
  query,
  orderBy,
  collection,
  addDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import { PROGRESS_VALUES } from '../../constants';

export interface CorrectionTable {
  id: string;
  month: number;
  date: number;
  reason: string;
  pay: number;
  irregular: number;
  progress: (typeof PROGRESS_VALUES)[number];
}

interface CorrectionTableState {
  table: CorrectionTable[];
}

const userId = sessionStorage.getItem('id') || '';

const querySnapshot = await getDocs(
  query(collection(firestore, 'User', userId, 'correction'), orderBy('date')),
);

const initialState: CorrectionTableState = {
  table: querySnapshot.docs.map((item) => {
    return { ...item.data(), id: item.id };
  }) as CorrectionTable[],
};

const correctionTableSlice = createSlice({
  name: 'correctionTable',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        appendAsync.fulfilled.type,
        (state, action: PayloadAction<CorrectionTable>) => {
          state.table = [...state.table, action.payload];
        },
      )
      .addCase(
        removeAsync.fulfilled.type,
        (state, action: PayloadAction<string>) => {
          state.table = state.table.filter(
            (item) => item.id !== action.payload,
          );
        },
      );
  },
});

export const appendAsync = createAsyncThunk(
  'correctionTable/appendAsync',
  async (correction: CorrectionTable) => {
    await addDoc(
      collection(firestore, 'User', userId, 'correction'),
      correction,
    );
    return correction;
  },
);

export const removeAsync = createAsyncThunk(
  'correctionTable/removeAsync',
  async (id: string) => {
    await deleteDoc(doc(firestore, 'User', userId, 'correction', id));
    return id;
  },
);

export default correctionTableSlice.reducer;
