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

const isSalaryTable = (docs: object[]): docs is SalaryTable[] =>
  docs.reduce(
    (acc, cur) =>
      acc &&
      'month' in cur &&
      'gross' in cur &&
      'bonus' in cur &&
      'tax' in cur &&
      'net' in cur,
    true,
  );

const userId = sessionStorage.getItem('id') || '';

const querySnapshot = await getDocs(
  query(collection(firestore, 'User', userId, 'salary'), orderBy('month')),
);
const snapshotArray = querySnapshot.docs.map((doc) => doc.data());

const initialState: SalaryTableState = {
  table: isSalaryTable(snapshotArray) ? snapshotArray : [],
};

const salaryTablesSlice = createSlice({
  name: 'salaryTable',
  initialState,
  reducers: {},
});

export default salaryTablesSlice.reducer;
