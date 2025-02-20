import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type
interface AuthState {
  token: string | null;
  isConfirmed: boolean;
  email: string;
}

// Initial state with type
const initialState: AuthState = {
  token: null,
  isConfirmed: false,
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
      state == initialState;
    },
    setIsConfirmed(state, action: PayloadAction<boolean>) {
      state.isConfirmed = action.payload;
      console.log(action.payload);
    },
  },
});

// Export actions and reducer
export const { login, logout, setIsConfirmed } = authSlice.actions;
export default authSlice.reducer;
