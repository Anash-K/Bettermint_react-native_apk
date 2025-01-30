import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type
interface AuthState {
  token: string | null;
  gender: string;
}

// Initial state with type
const initialState: AuthState = {
  token: null,
  gender: "Male",
};

// Create slice with typed reducers
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    logout(state) {
      state.token = null;
    },
    setGender(state, action: PayloadAction<string>) {
      state.gender = action.payload;
      console.log(action.payload);
    },
  },
});

// Export actions and reducer
export const { login, logout, setGender } = authSlice.actions;
export default authSlice.reducer;
