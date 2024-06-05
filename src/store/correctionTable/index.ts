import { createSlice } from '@reduxjs/toolkit';
import { PROGRESS_VALUES } from '../../constants';

export interface CorrectionTable {
  month: number;
  date: string;
  reason: string;
  pay: number;
  irregular: number;
  progress: (typeof PROGRESS_VALUES)[number];
}

const TABLE_DATA: CorrectionTable[] = [
  {
    month: 1,
    date: '2024-05-28',
    reason: '야근수당 초과 지급',
    pay: 3500000,
    irregular: 29700,
    progress: 'in progress',
  },
  {
    month: 2,
    date: '2024-04-28',
    reason: '휴일 수당 미지급',
    pay: 3500000,
    irregular: -127200,
    progress: 'done',
  },
  {
    month: 3,
    date: '2024-03-28',
    reason: '휴일 수당 미지급',
    pay: 3500000,
    irregular: -127200,
    progress: 'done',
  },
  {
    month: 4,
    date: '2024-02-28',
    reason: '휴일 수당 미지급',
    pay: 3500000,
    irregular: -127200,
    progress: 'done',
  },
  {
    month: 5,
    date: '2024-01-28',
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
