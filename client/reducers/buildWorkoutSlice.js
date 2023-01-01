import { createSlice } from '@reduxjs/toolkit';

export const buildWorkoutSlice = createSlice({
  name: 'buildWorkout',
  initialState: {
    value: 0,
    template: {},
    result: null,
    seeds: null,
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
      console.log('state', state.result);
      // for (const x of Object.entries(state.result)) {
      //   for (const y of Object.entries(state.result[x])) {
      //     if (y.id === action.payload) {
      //       console.log(state.result[x][y]);
      //       // delete state.result[x][y];
      //     }
      //   }
      // }
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
