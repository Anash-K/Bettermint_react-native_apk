import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import userReducer from './slices/workoutDetailsSlice'; 
import qnaReducer from './slices/qnaSlice';

export const rootReducer = combineReducers({
    auth: authReducer,
    userDetails: userReducer,
    qna:qnaReducer
});

export type RootState = ReturnType<typeof rootReducer>;