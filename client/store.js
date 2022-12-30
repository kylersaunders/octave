import { configureStore } from '@reduxjs/toolkit';
import workoutSectionsReducer from './features/buildWorkout/buildWorkoutSlice';
import playlistTracksReducer from './features/buildPlaylist/buildPlaylistSlice';

export default configureStore({
  reducer: {
    workoutSections: workoutSectionsReducer,
    playlistTracks: playlistTracksReducer,
  },
});
