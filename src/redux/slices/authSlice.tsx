import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
    },
    logout(state) {
      state.token = "";
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
