//import libraries
import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { addToPlaylist, createPlaylist } from '../utils/endpointFunctions';

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
  const dispatch = useDispatch();
  const { newPlaylist } = props;

  let sectionTime = 0;
  let totalTime = 0;
  function msToMinsSec(ms) {
    const mins = Math.floor(ms / 1000 / 60);
    let secs = Math.floor((ms / 1000 / 60 - Math.floor(ms / 1000 / 60)) * 60);
    secs < 10 ? (secs = '0' + secs) : '';
    return `${mins}:${secs}`;
  }

  async function createAndFillPlaylist(e) {
    e.preventDefault();
    const createPlaylistBody = await createPlaylist(
      document.getElementById('newPlaylistName').value
    );
    const playlistId = createPlaylistBody.id;
    if (newPlaylist.length) {
      const tracksToAdd = [];
      Object.values(newPlaylist).forEach((x) => {
        x.forEach((y) => {
          tracksToAdd.push(y.id);
        });
      });
      const response = await addToPlaylist(tracksToAdd, playlistId);
      // console.log(response);
    }
  }

  return (
    <div id='playlistSidebar'>
      <h3>
        <form onSubmit={createAndFillPlaylist}>
          <input
            id='newPlaylistName'
            type='text'
            placeholder='new playlist name'
          />
          <button type='submit' defaultValue='testlist'>
            Create playlist w/the tracks below
          </button>
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
              sectionTime = 0;
              return (
                <>
                  {y[1].map((x) => {
                    const {
                      preview_url,
                      id,
                      name,
                      popularity,
                      artists_names,
                      duration_ms,
                    } = x;
                    sectionTime += duration_ms;
                    totalTime += duration_ms;
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
                        <td>{msToMinsSec(duration_ms)}</td>
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
                  })}
                  <tr>
                    <td>Section total: </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{msToMinsSec(sectionTime)}</td>
                  </tr>
                  <br></br>
                </>
              );
            })}
            <tr>
              <td>Class total: </td>
              <td></td>
              <td></td>
              <td></td>
              <td>{msToMinsSec(totalTime)}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default connect(mapStateToProps)(CreatePlaylist);
