import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type
interface UserState {
  profileInfo: {
    name: string;
    date_of_birth: string;
    mobile_number:string;
    gender: string;
    height: number;
    weight: number;
    status: string;
    city: string;
    height_unit: string;
    weight_unit: string;
    profile_picture: string;
  };
  isProfileSetup: boolean;
  profilePicture: string;
  numberOfWorkout: number;
  sleepTrack: {
    bedTime: string;
    wakeupTime: string;
    reason?: string;
  };
  isWorkout: boolean;
  isStressLevel: boolean;
}

// Initial state with proper typing
export const initialUserState: UserState = {
  profileInfo: {
    name: "",
    date_of_birth: "",
    gender: "",
    mobile_number:'',
    height: 0,
    weight: 0,
    status: "",
    city: "",
    height_unit: "",
    weight_unit: "",
    profile_picture: "",
  },
  isProfileSetup: false,
  profilePicture: '',
  numberOfWorkout: 0,
  sleepTrack: {
    bedTime: "",
    wakeupTime: "",
    reason: "",
  },
  isWorkout: false,
  isStressLevel: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setFieldAction<K extends keyof UserState>(
      state: UserState,
      action: PayloadAction<{ field: K; value: UserState[K] }>
    ) {
      const { field, value } = action.payload;
      state[field] = value;
    },

    setBooleanFieldAction(
      state,
      action: PayloadAction<{
        field: "isProfileSetup";
        value: boolean;
      }>
    ) {
      const { field, value } = action.payload;
      state[field] = value;
    },

    removeProjectPhotos(state, action: PayloadAction<{ index: number }>) {
      state.projectPhotos = state.projectPhotos.filter(
        (_, index) => index !== action.payload.index
      );
    },
  },
});

// Export actions and reducer
export const { setBooleanFieldAction, removeProjectPhotos, setFieldAction } =
  userSlice.actions;

export default userSlice.reducer;
