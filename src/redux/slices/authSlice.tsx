import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  gender: "Male",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
    },
    logout(state) {
      state.token = null;
    },
    gender(state, action) {
      state.gender = action.payload;
      console.log(action.payload)
    },
  },
});

export const { login, logout, gender } = authSlice.actions;

export default authSlice.reducer;
