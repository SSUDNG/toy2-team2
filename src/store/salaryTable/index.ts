import { createSlice } from '@reduxjs/toolkit';
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
}

const createInitialState = async () => {
  try {
    const userId = sessionStorage.getItem('id');

    const querySnapshot = userId
      ? await getDocs(
          query(
            collection(firestore, 'User', userId, 'salary'),
            orderBy('month'),
          ),
        )
      : undefined;

    const initialState: SalaryTableState = {
      table: querySnapshot
        ? (querySnapshot.docs.map((doc) => doc.data()) as SalaryTable[])
        : [],
    };

    return initialState;
  } catch (error) {
    console.log(error);
    throw new Error('데이터베이스 조회에 실패했습니다.');
  }
};

const initialState = await createInitialState();

const salaryTablesSlice = createSlice({
  name: 'salaryTable',
  initialState,
  reducers: {},
});

export default salaryTablesSlice.reducer;
