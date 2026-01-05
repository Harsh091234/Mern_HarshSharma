import { createSlice } from "@reduxjs/toolkit";

const flowSlice = createSlice({
  name: "flow",
  initialState: {
    activeStepId: 1
  },
  reducers: {
    setActiveStep: (state, action) => {
      state.activeStepId = action.payload;
    }
  }
});

export const { setActiveStep } = flowSlice.actions;
export default flowSlice.reducer;
