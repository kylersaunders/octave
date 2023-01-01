import { createSlice } from '@reduxjs/toolkit';

export const createPlaylistSlice = createSlice({
  name: 'createPlaylist',
  initialState: {
    myPlaylists: null,
  },
  reducers: {
    selectPlaylistTracks: (state, action) => {
      return state.list;
    },
    addPlaylistTracks: (state, action) => {
      state.list = ['hello', 'goodbye'];
    },
    updateMyPlaylists: (state, action) => {
      state.myPlaylists = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectPlaylistTracks, addPlaylistTracks, updateMyPlaylists } =
  createPlaylistSlice.actions;

export default createPlaylistSlice.reducer;
