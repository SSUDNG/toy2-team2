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
  isFetched: boolean;
}

const initialState: CorrectionTableState = {
  table: [],
  isFetched: false,
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
          state.isFetched = true;
        },
      )
      .addCase(
        initializeCorrectionAsync.rejected.type,
        (state, action: { type: string; error: Error }) => {
          console.error(action.error.message);
          state.isFetched = false;
          throw action.error;
        },
      )
      .addCase(
        appendAsync.fulfilled.type,
        (state, action: PayloadAction<CorrectionTable>) => {
          state.table = [...state.table, action.payload];
          state.isFetched = false;
        },
      )
      .addCase(
        appendAsync.rejected.type,
        (_, action: { type: string; error: Error }) => {
          console.error(action.error.message);
          throw action.error;
        },
      )
      .addCase(
        removeAsync.fulfilled.type,
        (state, action: PayloadAction<string>) => {
          state.table = state.table.filter(
            (item) => item.id !== action.payload,
          );
        },
      )
      .addCase(
        removeAsync.rejected.type,
        (_, action: { type: string; error: Error }) => {
          console.error(action.error.message);
          throw action.error;
        },
      );
  },
});

export const initializeCorrectionAsync = createAsyncThunk(
  'correctionTable/initializeCorrectionAsync',
  async () => {
    const userId = sessionStorage.getItem('id');

    if (!userId) {
      throw new Error('유저 아이디 획득에 실패했습니다.');
    }

    const isOnline = navigator.onLine;

    if (!isOnline) {
      throw new Error('네트워크 연결에 실패했습니다.');
    }

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
      throw new Error('데이터베이스 연결에 실패했습니다.');
    }
  },
);

export const appendAsync = createAsyncThunk(
  'correctionTable/appendAsync',
  async (correction: Omit<CorrectionTable, 'id'>) => {
    const userId = sessionStorage.getItem('id');

    if (!userId) {
      throw new Error('유저 아이디 획득에 실피했습니다.');
    }

    const isOnline = navigator.onLine;

    if (!isOnline) {
      throw new Error('네트워크 연결에 실패했습니다.');
    }

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
      throw new Error('데이터베이스 연결에 실패했습니다.');
    }
  },
);

export const removeAsync = createAsyncThunk(
  'correctionTable/removeAsync',
  async (id: string) => {
    const userId = sessionStorage.getItem('id');

    if (!userId) {
      throw new Error('유저 아이디 획득에 실피했습니다.');
    }

    const isOnline = navigator.onLine;

    if (!isOnline) {
      throw new Error('네트워크 연결에 실패했습니다.');
    }

    try {
      await deleteDoc(doc(firestore, 'User', userId, 'correction', id));

      return id;
    } catch (error) {
      throw new Error('데이터베이스 연결에 실패했습니다.');
    }
  },
);

export default correctionTableSlice.reducer;
