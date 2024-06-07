import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

export interface SalaryTable {
  month: number;
  gross: number;
  bonus: number;
  tax: number;
  net: number;
}

interface SalaryTableState {
  table: SalaryTable[];
  isFetched: boolean;
}

const initialState: SalaryTableState = {
  table: [],
  isFetched: false,
};

const salaryTablesSlice = createSlice({
  name: 'salaryTable',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      initializeSalaryAsync.fulfilled.type,
      (state, action: PayloadAction<SalaryTable[]>) => {
        state.table = action.payload;
        state.isFetched = true;
      },
    );
  },
});

export const initializeSalaryAsync = createAsyncThunk(
  'salaryTable/initializeSalaryAsync',
  async () => {
    const userId = sessionStorage.getItem('id');

    if (!userId) {
      throw new Error('유저 아이디 획득에 실패했습니다.');
    }

    try {
      const querySnapshot = await getDocs(
        query(
          collection(firestore, 'User', userId, 'salary'),
          orderBy('month'),
        ),
      );

      const fetchedDocs: SalaryTable[] = querySnapshot.docs.map((doc) =>
        doc.data(),
      ) as SalaryTable[];

      return fetchedDocs;
    } catch (error) {
      console.log(error);
      throw new Error('데이터베이스 조회에 실패했습니다.');
    }
  },
);

export default salaryTablesSlice.reducer;
