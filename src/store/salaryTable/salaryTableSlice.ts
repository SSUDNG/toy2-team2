import { createSlice } from '@reduxjs/toolkit';

export interface SalaryTable {
  month: number;
  gross: number;
  bonus: number;
  tax: number;
  net: number;
}

const TABLE_DATA: SalaryTable[] = [
  {
    month: 1,
    gross: 3500000,
    bonus: 1200000,
    tax: 930000,
    net: 3770000,
  },
  {
    month: 2,
    gross: 3500000,
    bonus: 0,
    tax: 930000,
    net: 2570000,
  },
  {
    month: 3,
    gross: 3500000,
    bonus: 0,
    tax: 930000,
    net: 2570000,
  },
  {
    month: 4,
    gross: 3500000,
    bonus: 0,
    tax: 930000,
    net: 2570000,
  },
  {
    month: 5,
    gross: 3500000,
    bonus: 0,
    tax: 930000,
    net: 2570000,
  },
];

interface SalaryTableState {
  table: SalaryTable[];
}

const initialState: SalaryTableState = {
  table: TABLE_DATA,
};

const salaryTablesSlice = createSlice({
  name: 'salaryTable',
  initialState,
  reducers: {},
});

export default salaryTablesSlice.reducer;
