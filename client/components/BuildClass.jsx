import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import {
  deleteTrack,
  advanceTrack,
  delayTrack,
} from '../features/buildWorkout/buildWorkoutSlice';

const BuildClass = (props) => {
  const { newPlaylist } = props;
  const dispatch = useDispatch();
  return (
    <div id='playlistSidebar'>
      <h3>Create playlist:</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Artists</th>
            <th>Popularity</th>
            <th>Mins</th>
            <th>SPM</th>
            <th>X</th>
            <th>^</th>
            <th>v</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(newPlaylist).map((y) => {
            return y[1].map((x) => {
              const {
                preview_url,
                id,
                name,
                popularity,
                artists_names,
                duration_ms,
              } = x;
              return (
                <tr>
                  <td>
                    <audio controls src={preview_url} id={'prev' + id}></audio>
                  </td>
                  <td>{name}</td>
                  <td>{artists_names}</td>
                  <td>{popularity}</td>
                  <td>{(duration_ms / 1000 / 60).toFixed(2)}</td>
                  <td>TBD</td>
                  <td onClick={() => dispatch(deleteTrack({ id }))}>X</td>
                  <td onClick={() => dispatch(advanceTrack({ id }))}>^</td>
                  <td onClick={() => dispatch(delayTrack({ id }))}>v</td>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    newPlaylist: state.workoutSections.result,
  };
}

export default connect(mapStateToProps)(BuildClass);
