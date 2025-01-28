import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import userReducer from './slices/workoutDetailsSlice'; 

export const rootReducer = combineReducers({
    auth: authReducer,
    userDetails: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;