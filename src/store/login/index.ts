import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  department: string | null;
  jobposition: string | null;
  id: string | null;
}

const initialState: UserState = {
  department: 'department',
  jobposition: null,
  id: null,
};

const userSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUserInfo: (
      state,
      action: PayloadAction<{
        department: string;
        jobposition: string;
        id: string;
      }>,
    ) => {
      state.department = action.payload.department;
      state.jobposition = action.payload.jobposition;
      state.id = action.payload.id;
    },
    clearUserInfo: (state) => {
      state.department = null;
      state.jobposition = null;
      state.id = null;
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;

export default userSlice.reducer;
