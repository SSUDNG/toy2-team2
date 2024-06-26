import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  department: string | null;
  jobposition: string | null;
  id: string | null;
  email: string | null;
  joiningDate: string | null;
  name: string | null;
  isLogin: string | null;
}

const initialState: UserState = {
  department: '없음',
  jobposition: '없음',
  id: '없음',
  email: '없음',
  joiningDate: '없음',
  name: '없음',
  isLogin: sessionStorage.getItem('isLogin'),
};

const userSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUserInfo: (
      state,
      action: PayloadAction<{
        department: string;
        jobPosition: string;
        id: string;
        email: string;
        joiningDate: string;
        name: string;
      }>,
    ) => {
      state.department = action.payload.department;
      state.jobposition = action.payload.jobPosition;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.joiningDate = action.payload.joiningDate;
      state.name = action.payload.name;
      sessionStorage.setItem('isLogin', 'true');
    },
    clearUserInfo: (state) => {
      state.department = null;
      state.jobposition = null;
      state.id = null;
      state.email = null;
      state.joiningDate = null;
      state.name = null;
      sessionStorage.setItem('isLogin', '');
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;

export default userSlice.reducer;
