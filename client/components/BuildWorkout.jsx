//import libraries
import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

//import components
import SearchResults from './SearchResults.jsx';

//import functions
import {
  decrement,
  increment,
  updatePlaylist,
} from '../reducers/buildWorkoutSlice';
import { buildWorkout, getLocalSearch } from '../utils/endpointFunctions';
import { buildShortRecQueryString } from '../utils/endpointQueries';
import { parseResults, randomBuild } from '../utils/helperFunctions';

//map state
function mapStateToProps(state) {
  return {
    workoutSections: state.buildWorkout.value,
    workoutTemplate: state.buildWorkout.template,
    workoutResult: state.buildWorkout.result,
    workoutSeeds: state.buildWorkout.seeds,
  };
}

//render component
const BuildWorkout = (props) => {
  const { workoutSections, workoutTemplate, workoutResult, workoutSeeds } =
    props;
  const dispatch = useDispatch();

  const [showSearchDiv, updateShowSearchDiv] = useState(false);
  const [showMyPlaylists, updateShowMyPlaylists] = useState(false);
  const [seedTracks, updateSeedTracks] = useState({});

  const sectionsArray = Array.from(Array(workoutSections).keys());

  const generateWorkout = async (e) => {
    e.preventDefault();
    const workout = {};
    [...e.target.elements].map((x) => {
      if (x.id !== '') {
        !workout[x.id] ? (workout[x.id] = {}) : '';
        workout[x.id][x.name] = x.value;
        if (seedTracks[x.id]) {
          workout[x.id]['seed'] = seedTracks[x.id];
        } else {
          workout[x.id]['seed'] = [];
        }
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
                <label>How long is the section in mins? </label>
                <input
                  type='number'
                  id={x + 1}
                  name={`target_duration_mins`}
                  placeholder='#'
                  min={0}
                  max={60}
                  defaultValue={10}
                ></input>
                <br></br>
                <label>+/- how many seconds? </label>
                <input
                  type='number'
                  id={x + 1}
                  name={`target_time_over`}
                  placeholder='#'
                  min={0}
                  max={120}
                  defaultValue={60}
                ></input>
                <br></br>
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
                <br></br>
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
                <br></br>
                <label>Base the vibe on these songs: </label>
                <button type='button' onClick={() => updateShowSearchDiv(true)}>
                  Search Spotify
                </button>
                <button
                  type='button'
                  onClick={() => updateShowMyPlaylists(true)}
                >
                  Search from my playlists
                </button>
                {showSearchDiv && (
                  <SearchResults
                    updateSeedTracks={updateSeedTracks}
                    sectionId={x + 1}
                  />
                )}
                <br></br>
              </>
            );
          })}
          {(workoutSections ? true : false) && (
            <>
              <br></br>
              <button type='submit'>Generate Workout</button>
            </>
          )}
        </form>
      )}
      <Outlet />
    </>
  );
};

export default connect(mapStateToProps)(BuildWorkout);
