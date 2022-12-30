import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  count,
  updateTemplate,
  updatePlaylist,
  selectTemplate,
} from '../features/buildWorkout/buildWorkoutSlice';
import { buildWorkout } from '../utils/endpointFunctions';
import { buildShortRecQueryString } from '../utils/endpointQueries';
import { parseResults, randomBuild } from '../utils/helperFunctions';

const BuildWorkout = (props) => {
  const { workoutSections, workoutTemplate } = props;
  const dispatch = useDispatch();

  const ref = useRef();

  // const currentWorkout = useSelector(updateTemplate);
  // const currentSections = useSelector(count);

  // console.log('count', currentSections);

  //get reducer functions
  // const selector1 = useSelector(selectSections);
  // let selector2 = useSelector(addPlaylistTracks);
  // const selector3 = useSelector(selectPlaylistTracks);
  // const updateTemplate = useDispatch();
  // const currTemplate = useSelector(selectTemplaxte);

  const sectionsArray = Array.from(Array(workoutSections).keys());

  const generateWorkout = async (e) => {
    e.preventDefault();
    const workout = {};
    [...e.target.elements].map((x) => {
      if (x.id !== '') {
        !workout[x.id] ? (workout[x.id] = {}) : '';
        workout[x.id][x.name] = x.value;
      }
    });
    const results = {};
    for (const x of Object.keys(workout)) {
      results[x] = await buildWorkout(buildShortRecQueryString(workout[x]));
      results[x] = parseResults(results[x].tracks);
      results[x] = randomBuild(results[x], workout[x]);
    }
    dispatch(updatePlaylist(results));
    console.log(results);
  };

  return (
    <>
      {/* <button type='submit' onClick={loadSavedWorkouts}>Load Saved</button>
    <button type='submit' onClick={saveWorkouts}>Save Workout</button> */}
      <h3>Build Workout:</h3>
      <h2>
        <button onClick={() => dispatch(decrement())}>Remove section</button>
        <button onClick={() => dispatch(increment())}>Add section</button>
      </h2>
      {(workoutSections ? true : false) && (
        <form onSubmit={generateWorkout}>
          {sectionsArray.map((x) => {
            return (
              <>
                <h3>
                  <label>Section {x + 1}</label>
                </h3>
                <label>Duration (mins):</label>
                <input
                  type='number'
                  id={x + 1}
                  name={`target_duration_mins`}
                  placeholder='#'
                  min={0}
                  max={60}
                  defaultValue={10}
                ></input>
                <label>+/- (seconds):</label>
                <input
                  type='number'
                  id={x + 1}
                  name={`target_time_over`}
                  placeholder='#'
                  min={0}
                  max={120}
                  defaultValue={60}
                ></input>
                <label>SPM min:</label>
                <input
                  type='number'
                  id={x + 1}
                  name={`min_tempo`}
                  placeholder='#'
                  min={15}
                  max={45}
                  defaultValue={22}
                ></input>
                <label>SPM max:</label>
                <input
                  type='number'
                  id={x + 1}
                  name={`max_tempo`}
                  placeholder='#'
                  min={15}
                  max={45}
                  defaultValue={28}
                ></input>
              </>
            );
          })}
          {(workoutSections ? true : false) && (
            <button type='submit'>Generate Workout</button>
          )}
        </form>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    workoutSections: state.workoutSections.value,
    workoutTemplate: state.workoutSections.template,
  };
}

export default connect(mapStateToProps)(BuildWorkout);
