import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quest: [], // Stores the Q&A data
};

const qnaSlice = createSlice({
  name: "qna",
  initialState,
  reducers: {
    setQnA: (state, action) => {
      state.quest = action.payload;
    },
  },
});

export const { setQnA } = qnaSlice.actions;
export default qnaSlice.reducer;
