import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type
interface AuthState {
  token: string | null;
  gender: string;
  email: string;
}

// Initial state with type
const initialState: AuthState = {
  token: null,
  gender: "Male",
  email: "",
};

// Create slice with typed reducers
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthState>) {
      const { email, token } = action.payload;
      state.token = token;
      state.email = email;
    },
    logout(state) {
      state.token = null;
      state.email = "";
    },
    gender(state, action: PayloadAction<string>) {
      state.gender = action.payload;
      console.log(action.payload);
    },
  },
});

// Export actions and reducer
export const { login, logout, gender } = authSlice.actions;
export default authSlice.reducer;
