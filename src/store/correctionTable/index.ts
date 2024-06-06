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

const createInitialState = async () => {
  try {
    const userId = sessionStorage.getItem('id');

    const querySnapshot = userId
      ? await getDocs(
          query(
            collection(firestore, 'User', userId, 'correction'),
            orderBy('date'),
          ),
        )
      : undefined;

    const initialState: CorrectionTableState = {
      table: querySnapshot
        ? (querySnapshot.docs.map((item) => {
            return { ...item.data(), id: item.id };
          }) as CorrectionTable[])
        : [],
    };

    return initialState;
  } catch (error) {
    console.log(error);
    throw new Error('데이터베이스 조회에 실패했습니다.');
  }
};

const initialState = await createInitialState();

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
    const userId = sessionStorage.getItem('id') || '';
    try {
      await addDoc(
        collection(firestore, 'User', userId, 'correction'),
        correction,
      );
    } catch (error) {
      console.log(error);
      throw new Error('데이터베이스 조회에 실패했습니다.');
    }
    return correction;
  },
);

export const removeAsync = createAsyncThunk(
  'correctionTable/removeAsync',
  async (id: string) => {
    const userId = sessionStorage.getItem('id') || '';
    try {
      await deleteDoc(doc(firestore, 'User', userId, 'correction', id));
    } catch (error) {
      console.log(error);
      throw new Error('데이터베이스 조회에 실패했습니다.');
    }
    return id;
  },
);

export default correctionTableSlice.reducer;
