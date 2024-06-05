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

const userId = sessionStorage.getItem('id') || '';

const querySnapshot = await getDocs(
  query(collection(firestore, 'User', userId, 'salary'), orderBy('month')),
);

const initialState: SalaryTableState = {
  table: querySnapshot.docs.map((doc) => doc.data()) as SalaryTable[],
};

const salaryTablesSlice = createSlice({
  name: 'salaryTable',
  initialState,
  reducers: {},
});

export default salaryTablesSlice.reducer;
