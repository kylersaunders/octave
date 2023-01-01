//import libraries
import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';

//import functions
import {
  deleteTrack,
  advanceTrack,
  delayTrack,
} from '../reducers/buildWorkoutSlice';

function mapStateToProps(state) {
  return {
    newPlaylist: state.buildWorkout.result,
  };
}

const CreatePlaylist = (props) => {
  const { newPlaylist } = props;
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // console.log('new', newPlaylist);
  return (
    <div id='playlistSidebar'>
      <h3>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='new playlist name' />
        </form>
      </h3>
      {(newPlaylist ? true : false) && (
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
                      <audio
                        controls
                        src={preview_url}
                        id={'prev' + id}
                      ></audio>
                    </td>
                    <td>{name}</td>
                    <td>{artists_names}</td>
                    <td>{popularity}</td>
                    <td>{(duration_ms / 1000 / 60).toFixed(2)}</td>
                    <td>TBD</td>
                    <td
                      className={'playlistEdit'}
                      onClick={() => dispatch(deleteTrack({ id }))}
                    >
                      X
                    </td>
                    <td
                      className={'playlistEdit'}
                      onClick={() => dispatch(advanceTrack({ id }))}
                    >
                      ^
                    </td>
                    <td
                      className={'playlistEdit'}
                      onClick={() => dispatch(delayTrack({ id }))}
                    >
                      v
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      )}
      <h3>
        <form onSubmit={handleSubmit}>
          <button type='submit' defaultValue='testlist'>
            Create playlist
          </button>
        </form>
      </h3>
    </div>
  );
};

export default connect(mapStateToProps)(CreatePlaylist);
