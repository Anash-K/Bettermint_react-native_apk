import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type
interface UserState {
  profileInfo: {
    name: string;
    date_of_birth: string;
    callingCode:string;
    mobile_number: string;
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
  physicalMeasurements:{
    chest: number; // in inches
    waist: number; // in inches
    hip: number; // in inches
    thigh: number; // in inches
    user_diseases: string| string[]; // array of disease names
    user_family_diseases:string| string[]; // array of family disease names
  },
  medicalMeasurements: {
    blood_glucose: number; // in mg/dl
    total_cholesterol: number; // in mg/dl
    hdl_cholesterol: number; // in mg/dl
    ldl_cholesterol: number; // in mg/dl
    systolic_blood_pressure: number; // in mmHg
    diastolic_blood_pressure: number; // in mmHg
    date_of_report: string; // format: Y-m-d
  };
}

// Initial state with proper typing
export const initialUserState: UserState = {
  profileInfo: {
    name: "",
    date_of_birth: "",
    gender: "",
    callingCode:'',
    mobile_number: "",
    height: 0,
    weight: 0,
    status: "",
    city: "",
    height_unit: "",
    weight_unit: "",
    profile_picture: "",
  },
  isProfileSetup: false,
  profilePicture: "",
  numberOfWorkout: 0,
  sleepTrack: {
    bedTime: "",
    wakeupTime: "",
    reason: "",
  },
  isWorkout: false,
  isStressLevel: false,
  physicalMeasurements:{
    chest: 0,
    waist: 0,
    hip: 0,
    thigh: 0,
    user_diseases: [],
    user_family_diseases: [],
  },
  medicalMeasurements: {
    blood_glucose: 0,
    total_cholesterol: 0,
    hdl_cholesterol: 0,
    ldl_cholesterol: 0,
    systolic_blood_pressure: 0,
    diastolic_blood_pressure: 0,
    date_of_report: "",
  },
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
