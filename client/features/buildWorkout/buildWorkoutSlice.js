import { createSlice } from '@reduxjs/toolkit';

export const buildWorkoutSlice = createSlice({
  name: 'workoutSections',
  initialState: {
    value: 0,
    template: {},
    result: {},
  },
  reducers: {
    increment: (state) => {
      state.value <= 8 ? (state.value += 1) : '';
    },
    decrement: (state) => {
      state.value ? (state.value -= 1) : state.value;
    },
    incrementByAmount: (state, action) => {
      state.value += action.value;
    },
    count: (state, action) => {
      return state.value;
    },
    updateTemplate: (state, action) => {
      state.template = action.payload;
    },
    updatePlaylist: (state, action) => {
      state.result = action.payload;
    },
    deleteTrack: (state, action) => {
      state.result = state.result.filter((x) => x.id != action.payload);
    },
    advanceTrack: (state, action) => {
      state.result = state.result.filter((x) => x.id != action.payload);
    },
    delayTrack: (state, action) => {
      state.result = state.result.filter((x) => x.id != action.payload);
    },
    selectTemplate: (state) => {
      // return state.playlist.template;
      //it doesn't care?
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  incrementByAmount,
  count,
  updateTemplate,
  updatePlaylist,
  selectTemplate,
  deleteTrack,
  advanceTrack,
  delayTrack,
} = buildWorkoutSlice.actions;

export default buildWorkoutSlice.reducer;
