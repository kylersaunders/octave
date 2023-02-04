import { configureStore } from '@reduxjs/toolkit';
import buildWorkoutReducer from './reducers/buildWorkoutSlice';
// import createPlaylistReducer from './reducers/createPlaylistSlice';

export default configureStore({
  reducer: {
    buildWorkout: buildWorkoutReducer,
    // createPlaylist: createPlaylistReducer,
  },
});
