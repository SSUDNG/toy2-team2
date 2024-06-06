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

const initialState: CorrectionTableState = {
  table: [],
};

const correctionTableSlice = createSlice({
  name: 'correctionTable',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        initializeCorrectionAsync.fulfilled.type,
        (state, action: PayloadAction<CorrectionTable[]>) => {
          state.table = action.payload;
        },
      )
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

export const initializeCorrectionAsync = createAsyncThunk(
  'correctionTable/initializeCorrectionAsync',
  async (userId: string) => {
    try {
      const querySnapshot = await getDocs(
        query(
          collection(firestore, 'User', userId, 'correction'),
          orderBy('date'),
        ),
      );

      const fetchedDocs: CorrectionTable[] = querySnapshot.docs.map((item) => {
        return { ...item.data(), id: item.id };
      }) as CorrectionTable[];

      return fetchedDocs;
    } catch (error) {
      console.log(error);
      throw new Error('데이터베이스 조회에 실패했습니다.');
    }
  },
);

export const appendAsync = createAsyncThunk(
  'correctionTable/appendAsync',
  async (correction: Omit<CorrectionTable, 'id'>) => {
    const userId = sessionStorage.getItem('id') || '';
    try {
      const docRef = await addDoc(
        collection(firestore, 'User', userId, 'correction'),
        correction,
      );

      return {
        ...correction,
        id: docRef.id,
      };
    } catch (error) {
      console.log(error);
      throw new Error('데이터베이스 조회에 실패했습니다.');
    }
  },
);

export const removeAsync = createAsyncThunk(
  'correctionTable/removeAsync',
  async (id: string) => {
    const userId = sessionStorage.getItem('id') || '';
    try {
      await deleteDoc(doc(firestore, 'User', userId, 'correction', id));

      return id;
    } catch (error) {
      console.log(error);
      throw new Error('데이터베이스 조회에 실패했습니다.');
    }
  },
);

export default correctionTableSlice.reducer;
