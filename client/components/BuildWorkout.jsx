import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  selectSections,
} from '../features/buildWorkout/buildWorkoutSlice';
import {
  addPlaylistTracks,
  selectPlaylistTracks,
} from '../features/buildPlaylist/buildPlaylistSlice';

function mapStateToProps(state) {
  return {
    workoutSections: state.workoutSections.value,
    playlistTracks: state.playlistTracks.list,
  };
}

const BuildWorkout = (props) => {
  const dispatch = useDispatch();

  //get reducer functions
  const selector1 = useSelector(selectSections);
  let selector2 = useSelector(addPlaylistTracks);
  const selector3 = useSelector(selectPlaylistTracks);

  const { workoutSections, playlistTracks } = props;
  const sectionsArray = Array.from(Array(workoutSections).keys());
  return (
    <>
      {/* <button type='submit' onClick={loadSavedWorkouts}>Load Saved</button>
    <button type='submit' onClick={saveWorkouts}>Save Workout</button> */}
      <h3>Build Workout:</h3>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(increment())}>+</button>
      {(workoutSections ? true : false) && (
        <table>
          <thead>
            <tr>
              <th>Section</th>
              <th>Length (mins)</th>
              <th>+/- (secs)</th>
              <th>Feeder Track</th>
            </tr>
          </thead>
          <tbody>
            {sectionsArray.map((x) => {
              return (
                <>
                  <tr>
                    <td>Section {x}:</td>
                    <td>
                      <input id={`sectionLengthMins${x}`} type='text' />
                    </td>
                    <td>
                      <input id={`sectionLengthSecs${x}`} type='text' />
                    </td>
                    <td>Feeder</td>
                  </tr>
                  <tr>
                    <td>Transition Song:</td>
                    <td>
                      <input id={`transitionLengthSecs${x}`} type='text' />
                    </td>
                    <td>
                      <input id={`transitionLengthSecs${x}`} type='text' />
                    </td>
                    <td>N/A</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      )}
      {(workoutSections ? true : false) && (
        <button
          type='submit'
          onClick={() => {
            selector2;
            console.log(selector3);
          }}
        >
          Generate Workout
        </button>
      )}
    </>
  );
};

export default connect(mapStateToProps)(BuildWorkout);
