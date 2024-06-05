import { createSlice } from '@reduxjs/toolkit';
import { PROGRESS_VALUES } from '../../constants';

export interface CorrectionTable {
  number: number;
  date: string;
  reason: string;
  pay: number;
  irregular: number;
  progress: (typeof PROGRESS_VALUES)[number];
}

const TABLE_DATA: CorrectionTable[] = [
  {
    number: 1,
    date: '24.05.28',
    reason: '야근수당 초과 지급',
    pay: 3500000,
    irregular: 29700,
    progress: 'in progress',
  },
  {
    number: 2,
    date: '24.04.28',
    reason: '휴일 수당 미지급',
    pay: 3500000,
    irregular: -127200,
    progress: 'done',
  },
  {
    number: 3,
    date: '24.03.28',
    reason: '휴일 수당 미지급',
    pay: 3500000,
    irregular: -127200,
    progress: 'done',
  },
  {
    number: 4,
    date: '24.02.28',
    reason: '휴일 수당 미지급',
    pay: 3500000,
    irregular: -127200,
    progress: 'done',
  },
  {
    number: 5,
    date: '24.01.28',
    reason: '휴일 수당 미지급',
    pay: 3500000,
    irregular: -127200,
    progress: 'done',
  },
];

interface CorrectionTableState {
  table: CorrectionTable[];
}

const initialState: CorrectionTableState = {
  table: TABLE_DATA,
};

const correctionTableSlice = createSlice({
  name: 'correctionTable',
  initialState,
  reducers: {},
});

export default correctionTableSlice.reducer;
