import { createSlice } from '@reduxjs/toolkit';

export const buildWorkoutSlice = createSlice({
  name: 'workoutSections',
  initialState: {
    value: 0,
    template: {
      duration: [5, 10, 15],
      overUnder: [30, 90, 30],
      seed: ['xyz', 'xyz', 'xyz'],
    },
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value ? (state.value -= 1) : state.value;
      // state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.value;
    },
    selectSections: (state, action) => {
      return state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, selectSections } =
  buildWorkoutSlice.actions;

export default buildWorkoutSlice.reducer;
