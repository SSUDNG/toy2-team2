import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getDocs, query, orderBy, collection } from 'firebase/firestore';
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
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      console.log('add', state.table, action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      console.log('remove', state.table, action.payload);
    },
  },
});

export const { add, remove } = correctionTableSlice.actions;

export default correctionTableSlice.reducer;
