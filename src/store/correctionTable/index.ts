import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getDocs,
  query,
  orderBy,
  collection,
  addDoc,
} from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import { PROGRESS_VALUES } from '../../constants';

export interface CorrectionTable {
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
  table: querySnapshot.docs.map((doc) => doc.data()) as CorrectionTable[],
};

const correctionTableSlice = createSlice({
  name: 'correctionTable',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      appendAsync.fulfilled.type,
      (state, action: PayloadAction<CorrectionTable>) => {
        state.table = [...state.table, action.payload];
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

export default correctionTableSlice.reducer;
