import { createSlice } from '@reduxjs/toolkit';

export const buildPlaylistSlice = createSlice({
  name: 'playlistTracks',
  initialState: {
    list: ['test', 'case'],
    hi: 'hello',
  },
  reducers: {
    selectPlaylistTracks: (state, action) => {
      return state.list;
    },
    addPlaylistTracks: (state, action) => {
      state.list = ['hello', 'goodbye'];
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectPlaylistTracks, addPlaylistTracks } =
  buildPlaylistSlice.actions;

export default buildPlaylistSlice.reducer;
